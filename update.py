import requests
import zipfile
from os import rename, path, remove
import io
import pandas as pd

def _get_data():
    # remove 2020 if not wanted
    input_filenames=['2020_GB_Region_Mobility_Report.csv','2021_GB_Region_Mobility_Report.csv']
    output_filename=path.join('src','data.csv')
    zip_file_url = 'https://www.gstatic.com/covid19/mobility/Region_Mobility_Report_CSVs.zip'
    try:
        r = requests.get(zip_file_url)
    except requests.exceptions.RequestException as e:  # This is the correct syntax
        raise SystemExit(e)
    z = zipfile.ZipFile(io.BytesIO(r.content))
    pd.concat([pd.read_csv(z.open(x)) for x in input_filenames]).to_csv(output_filename, index=False)

_get_data()