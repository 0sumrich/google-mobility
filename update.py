import requests
import zipfile
from os import rename, path, remove
import io

def _get_data():
    input_filename='2020_GB_Region_Mobility_Report.csv'
    output_filename=path.join('src','data.csv')
    zip_file_url = 'https://www.gstatic.com/covid19/mobility/Region_Mobility_Report_CSVs.zip'
    try:
        r = requests.get(zip_file_url)
    except requests.exceptions.RequestException as e:  # This is the correct syntax
        raise SystemExit(e)
    z = zipfile.ZipFile(io.BytesIO(r.content))
    z.extractall(members=[input_filename])
    if path.exists(output_filename):
        remove(output_filename)
    rename(input_filename, path.join('src', 'data.csv'))

_get_data()