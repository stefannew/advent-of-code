import { fetchInput } from '../../utils/fetch-input';

enum Command {
  ChangeDirectory = 'cd',
  List = 'ls'
}

type Instruction = {
  command: Command;
  argument: string;
  output: string[];
}

function parseInput(input: string): Instruction[] {
  const lines = input.trim().split('\n');
  const instructions = [];

  for (let pointer = 0; pointer < lines.length; pointer++) {
    let command = '';
    let argument = '';
    let output = [];
    const line = lines[pointer].trim();
    if (line.startsWith('$')) {
      [command, argument] = line.substring(1).trim().split(' ');
      // take next lines until '$' - this is the output
      for (let i = pointer + 1; i <= lines.length - 1; i++) {
        const next = lines[i].trim();
        if (!next.startsWith('$')) {
          output.push(next);
        } else {
          break;
        }
      }
      instructions.push({
        command,
        argument,
        output
      });
    }
  }

  return instructions;
}

class Directory {
  parent?: Directory;
  children: Array<Directory | File> = [];
  name: string;
  size = 0;

  constructor(name: string, parent: Directory) {
    this.name = name;
    this.parent = parent;
  }

  addChild(child: Directory | File) {
    this.children.push(child);
  }

  addSize(size: number) {
    this.size += size;

    if (this.parent) {
      this.parent.addSize(size);
    }
  }
}

class File {
  name: string;
  size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
}

function createFileSystem(instructions: Instruction[]) {
  let currentDir: Directory = new Directory('/', undefined);
  let path = [];
  let pathname = '';

  const fs = new Map<string, Directory>();

  for (let instruction of instructions) {
    switch (instruction.command) {
      case Command.ChangeDirectory:
        if (instruction.argument === '/') {
          path = ['/'];
        } else if (instruction.argument === '..') {
          path.pop();
          break;
        } else {
          path.push(instruction.argument);
        }

        if (path.length > 1) {
          pathname = path.join('/').substring(1);
        } else {
          pathname = path[0];
        }

        if (fs.has(pathname)) {
          currentDir = fs.get(pathname);
        } else {
          currentDir = new Directory(pathname, currentDir);
        }
        break;
      case Command.List:
        for (let output of instruction.output) {
          const [metadata, name] = output.split(' ');

          let pathToDirectory = '';

          if (path.length > 1) {
            pathToDirectory = path.join('/').substring(1) + '/' + name;
          } else {
            pathToDirectory = path[0] + name;
          }

          if (metadata === 'dir') {
            const dir = new Directory(name, currentDir);
            currentDir.addChild(dir);
            fs.set(pathToDirectory, dir);
          } else {
            const file = new File(name, parseInt(metadata));
            currentDir.addChild(file);
            currentDir.addSize(file.size);
          }
        }
        fs.set(pathname, currentDir);
    }
  }

  return fs.get('/');
}

function traverse(directory: Directory, callback: (item: Directory) => void) {
  if (directory === null) {
    return;
  }

  directory.children.forEach(child => {
    if (child instanceof Directory) {
      traverse(child, callback);
      callback(child);
    }
  })
}

function getAllDirectories(fs: Directory) {
  const directories = new Set<Directory>();

  traverse(fs, (directory) => {
    directories.add(directory);
  });

  return directories;
}

export function getSumDirectories(input: string, maxSize: number) {
  const instructions = parseInput(input);
  const fs = createFileSystem(instructions);
  const directories = getAllDirectories(fs);

  return Array.from(directories)
    .filter(directory => directory.size <= maxSize)
    .reduce((sum, directory) => sum + directory.size, 0);
}

export function getSizeSmallestDeletableDirectory(input: string) {
  const TOTAL_DISK_SIZE = 70000000;
  const REQUIRED_SIZE = 30000000;
  const instructions = parseInput(input);
  const fs = createFileSystem(instructions);
  const remainingSize = TOTAL_DISK_SIZE - fs.size;
  const targetSize = REQUIRED_SIZE - remainingSize;

  const directories = getAllDirectories(fs);
  const targetDirectories = Array.from(directories)
    .filter(directory => directory.size >= targetSize);

  return targetDirectories.reduce((acc, curr) => {
    if (acc < curr.size) {
      return acc;
    }

    return curr.size;
  }, targetDirectories[0].size);
}


(async () => {
  const input = await fetchInput(2022, 7);
  console.log('The sum of the total sizes of the directories which are at most 100000', getSumDirectories(input, 100000));
  console.log('Size of smallest deletable directory', getSizeSmallestDeletableDirectory(input));
})();