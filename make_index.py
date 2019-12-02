import os
import requests
from urllib.parse import quote
import json

# Queries
MAX = 500
BASE_URL = 'https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit={}'.format(MAX)

def get_api_request(offset, **kwargs):
    q = '{}&offset={}'.format(BASE_URL, offset)
    for key, value in kwargs.items():
        q += '&{}={}'.format(key, quote(value))
    return q

def get_data(**kwargs):
    offset = 0
    data = []
    while offset % MAX == 0:
        url = get_api_request(offset, **kwargs)
        r = requests.get(url).json()
        try:
            data += r['cargoquery']
            offset += len(data)
        except:
            raise Exception(url)
    return data

win_animation = {
    'Axe': 'AXE_WIN_01',
    'Bow': 'BOW_WIN_01',
    'Staff': 'CAN_WIN_01',
    'Lance': 'LAN_WIN_01',
    'Sword': 'SWD_WIN_01',
    'Dagger': 'DAG_WIN_01',
    'Wand': 'ROD_WIN_01',
    'Blade': 'KAT_WIN_01'
}
win_animation_special = {
    'Axe': ['10000213'],
    'Bow': ['10002902'],
    'Staff': [],
    'Lance': ['10001004', '11032801'],
    'Sword': ['10000108', '10000307', '11029101', '11032701'],
    'Dagger': [],
    'Wand': ['10000410', '11033301'],
    'Blade': []
}
if __name__ == '__main__':
    # https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit=500&tables=Adventurers&fields=Id,VariationId,FullName,WeaponType
    chara = {'c{}_{:02d}'.format(d['title']['Id'], int(d['title']['VariationId'])) : d['title'] for d in get_data(tables='Adventurers', fields='Id,VariationId,FullName,WeaponType')}
    dragon = {'d{}_{:02d}'.format(d['title']['BaseId'], int(d['title']['VariationId'])) : d['title'] for d in get_data(tables='Dragons', fields='BaseId,VariationId,FullName')}

    fbx_index = {
        'c': {},
        'd': {}
    }
    for d in os.listdir('./src/fbx'):
        if os.path.isdir('./src/fbx/'+d):
            if d[0] == 'c':
                try:
                    fbx_index[d[0]][d] = {
                        'name': chara[d]['FullName'],
                        'win': win_animation[chara[d]['WeaponType']] if '{}{:02d}'.format(chara[d]['Id'], int(chara[d]['VariationId'])) not in win_animation_special[chara[d]['WeaponType']] else '{}_{}{:02d}'.format(win_animation[chara[d]['WeaponType']], chara[d]['Id'], int(chara[d]['VariationId']))
                    }
                except KeyError:
                    fbx_index[d[0]][d] = {
                        'name': '???',
                        'win': None
                    }
            elif d[0] == 'd':
                try:
                    fbx_index[d[0]][d] = dragon[d]['FullName']
                except KeyError:
                    try:
                        fbx_index[d[0]][d] = '{} EX{}'.format(dragon[d[:-3]]['FullName'], d[-2:])
                    except KeyError:
                        fbx_index[d[0]][d] = '???'
    with open('src/fbx/index.json', 'w') as f:
        f.write(json.dumps(fbx_index))

    
    