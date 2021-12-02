with open('../../inputs/d01.txt', 'r') as file:
    data = [int(line) for line in file.readlines()]

prev = data[0]
count = 0

for line in data[1:]:
    if line > prev:
        count += 1
    prev = line

print(count)
