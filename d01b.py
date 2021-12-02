with open('./inputs/d01.txt', 'r') as file:
    data = [int(line) for line in file.readlines()]
    sliced_data = [data[i:i+3] for i in range(len(data) - 2)]

prev = sum(sliced_data[0])
count = 0

for window in sliced_data[1:]:
    if sum(window) > prev:
        count += 1
    prev = sum(window)

print(count)
