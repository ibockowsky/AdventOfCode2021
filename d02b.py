with open('./inputs/d02.txt', 'r') as file:
    data = [line.split(" ") for line in file.readlines()]


depth = 0
horizontal = 0
aim = 0

for command in data:
    if command[0] == 'forward':
        horizontal += int(command[1])
        depth += int(command[1]) * aim if aim > 0 else 0
    elif command[0] == 'up':
        aim -= int(command[1])
    elif command[0] == 'down':
        aim += int(command[1])

print(depth, horizontal, aim, depth * horizontal)
