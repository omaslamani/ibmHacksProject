import csv, json

csvFilePath = 'pv_open_2020.csv'
jsonFilePath = 'json_open_2020.json'

#read csv file and add to data
data={}
with open(csvFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for rows in csvReader:
        id = rows['sc_gid']
        data[id]= rows

#create new json file and write data on it
with open(jsonFilePath, 'w') as jsonFile:
    # make it more readable
    jsonFile.write(json.dumps(data, indent=4))