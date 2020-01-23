import os
import sys
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
            if len(r['cargoquery']) == 0:
                break
            data += r['cargoquery']
            offset += len(r['cargoquery'])
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
    'Wand': ['10000410', '11033301', '11035401'],
    'Blade': ['10000609']
}
if __name__ == '__main__':
    chara = {'c{}_{:02d}'.format(d['title']['Id'], int(d['title']['VariationId'])) : d['title'] for d in get_data(tables='Adventurers', fields='Id,VariationId,FullName,WeaponType')}
    dragon = {'d{}_{:02d}'.format(d['title']['BaseId'], int(d['title']['VariationId'])) : d['title'] for d in get_data(tables='Dragons', fields='BaseId,VariationId,FullName')}
    weapon = {'w{}_{:02d}'.format(d['title']['BaseId'], int(d['title']['VariationId'])) : d['title'] for d in get_data(tables='Weapons', fields='BaseId,VariationId,WeaponName,Type')}

    fbx_index = {
        'c': {},
        'd': {},
        'w': {}
    }

    idx_dir = sys.argv[1] if len(sys.argv) > 1 else './fbx/'
    
    for d in os.listdir(idx_dir):
        if os.path.isdir(idx_dir+d):
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
                    fbx_index[d[0]][d] = {
                        'name': dragon[d]['FullName']
                    }
                except KeyError:
                    try:
                        fbx_index[d[0]][d] = {'name': '{} EX{}'.format(dragon[d[:-3]]['FullName'], d[-2:])}
                    except KeyError:
                        fbx_index[d[0]][d] = {'name': '???'}
            elif d[0] == 'w':
                try:
                    wpn = weapon[d]
                    fbx_index[d[0]][d] = {
                        'wt': wpn['Type'],
                        'name': wpn['WeaponName'],
                    }
                except KeyError:
                    try:
                        m = d[:-1]+'1'
                        fbx_index[d[0]][m]['ex'] = d
                    except KeyError:
                        fbx_index[d[0]][d] = {'name': '???'}
    with open('src/index.json', 'w') as f:
        f.write(json.dumps(fbx_index))