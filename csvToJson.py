import csv, json

csvFilePath = 'pv_open_2020.csv'
jsonFilePath = 'json_open_2020.json'

#read csv file and add to data
data=[]
with open(csvFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for rows in csvReader:
        del rows["sc_gid"]
        del rows["capacity_factor"]
        del rows["global_horizontal_irradiance"]
        del rows["distance_to_transmission_km"]
        if (-87.6256 < float(rows["longitude"]) < -79.8198 and (24.3959 < float(rows["latitude"]) < 31.0035)):
            data.append(rows)
            print(float(rows['capacity_mw'])/float(rows['area_sq_km']))
            
#create new json file and write data on it
with open(jsonFilePath, 'w') as jsonFile:
    # make it more readable
    jsonFile.write(json.dumps(data, indent=4))