import pandas as pd
import requests
import zipfile
import io
import plotly.graph_objects as go
from ipywidgets import widgets
from ipywidgets.embed import embed_data
import json
import datetime

filename = '2020_GB_Region_Mobility_Report.csv'


def _get_data():
    zip_file_url = 'https://www.gstatic.com/covid19/mobility/Region_Mobility_Report_CSVs.zip'
    r = requests.get(zip_file_url)
    z = zipfile.ZipFile(io.BytesIO(r.content))
    z.extractall(members=[filename])


_get_data()

drop_columns = ['country_region_code', 'country_region',
                'metro_area', 'iso_3166_2_code', 'census_fips_code']
df = pd.read_csv(filename, parse_dates=['date']).drop(drop_columns, axis=1)

chart_options = widgets.Dropdown(
    options=list(df.columns[3:]),
    value='retail_and_recreation_percent_change_from_baseline',
    description='Mobility area'
)

sub_region_1_options = widgets.Dropdown(
    options=list(df['sub_region_1'].unique()),
    value='Greater London',
    description='Sub region 1',
)


def _get_sr2_options():
    return list(df[df['sub_region_1'] == sub_region_1_options.value]['sub_region_2'].unique())


sub_region_2_options = widgets.Dropdown(
    options=_get_sr2_options(),
    value='London Borough of Barnet',
    description='Sub region 2',
)


def get_x_and_y():
    filter_list = [i and j for i, j in
                   zip(df['sub_region_1'] == sub_region_1_options.value,
                       df['sub_region_2'] == sub_region_2_options.value)]
    temp_df = df[filter_list]
    x = temp_df['date']
    y = temp_df[chart_options.value]
    return [x, y]


def get_title():
    return sub_region_2_options.value + '<br>' + chart_options.value


x, y = get_x_and_y()
trace = go.Scatter(x=x, y=y, name=chart_options.value)
g = go.FigureWidget(data=[trace],
                    layout=go.Layout(
                        title=dict(
                            text=get_title(),
                            x=0.5
                        ),
                        yaxis=dict(
                            title={'text': chart_options.value}
                        )
))


def response(change):
    x, y = get_x_and_y()
    sub_region_2_options.options = _get_sr2_options()
    with g.batch_update():
        g.data[0].x = x
        g.data[0].y = y
        g.layout.title = dict(text=get_title(), x=0.5)
        g.layout.yaxis.title = chart_options.value


chart_options.observe(response, names="value")
sub_region_1_options.observe(response, names="value")
sub_region_2_options.observe(response, names="value")


opts = widgets.VBox(
    [chart_options, sub_region_1_options, sub_region_2_options])
widg = widgets.VBox([opts, g])
data = embed_data(views=[widg])
html_template = """
<html>
  <head>

    <title>Widget export</title>

    <!-- Load RequireJS, used by the IPywidgets for dependency management -->
    <script 
      src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.4/require.min.js" 
      integrity="sha256-Ae2Vz/4ePdIu6ZyI/5ZGsYnb+m0JlOmKPjt6XZ9JJkA=" 
      crossorigin="anonymous">
    </script>

    <!-- Load IPywidgets bundle for embedding. -->
    <script
      data-jupyter-widgets-cdn="https://cdn.jsdelivr.net/npm/"
      src="https://unpkg.com/@jupyter-widgets/html-manager@*/dist/embed-amd.js" 
      crossorigin="anonymous">
    </script>

    <!-- The state of all the widget models on the page -->
    <script type="application/vnd.jupyter.widget-state+json">
      {manager_state}
    </script>
    <script src="d3-dsv.min.js"></script>
  </head>

  <body>

    <h1>Google Mobility Data for UK</h1>

    <div id="main">
      <!-- This script tag will be replaced by the view's DOM tree -->
      <script type="application/vnd.jupyter.widget-view+json">
        {widget_views[0]}
      </script>
    </div>

    <hrule />
    <script src="main.js"></script>
  </body>
</html>
"""


def myconverter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()


manager_state = json.dumps(data['manager_state'], default=myconverter)
widget_views = [json.dumps(view) for view in data['view_specs']]
rendered_template = html_template.format(
    manager_state=manager_state, widget_views=widget_views)
with open('index.html', 'w') as fp:
    fp.write(rendered_template)
