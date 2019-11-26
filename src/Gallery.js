// https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit=500&tables=Adventurers&fields=Id,Name
import React from 'react';
import { Link } from 'react-router-dom';

class ModelList extends React.Component {
    constructor(props) {
        super(props);
        const fn = ['c100001_01', 'c100001_08', 'c100002_01', 'c100002_02', 'c100002_06', 'c100003_01', 'c100003_02', 'c100003_07', 'c100004_01', 'c100004_02', 'c100004_04', 'c100004_10', 'c100005_01', 'c100006_01', 'c100006_03', 'c100009_01', 'c100010_04', 'c100010_07', 'c100016_01', 'c100018_01', 'c100027_01', 'c100029_01', 'c100029_02', 'c110001_01', 'c110002_01', 'c110002_02', 'c110003_01', 'c110004_01', 'c110004_02', 'c110005_01', 'c110006_01', 'c110007_01', 'c110008_01', 'c110009_01', 'c110010_01', 'c110011_01', 'c110011_02', 'c110012_01', 'c110013_01', 'c110014_01', 'c110015_01', 'c110015_02', 'c110016_01', 'c110017_01', 'c110018_01', 'c110019_01', 'c110020_01', 'c110021_01', 'c110022_01', 'c110022_02', 'c110023_01', 'c110024_01', 'c110025_01', 'c110026_01', 'c110027_01', 'c110028_01', 'c110029_01', 'c110029_02', 'c110030_01', 'c110031_01', 'c110032_01', 'c110032_02', 'c110033_01', 'c110034_01', 'c110035_01', 'c110036_01', 'c110037_01', 'c110038_01', 'c110039_01', 'c110040_01', 'c110041_01', 'c110042_01', 'c110042_02', 'c110043_01', 'c110043_02', 'c110044_01', 'c110045_01', 'c110046_01', 'c110047_01', 'c110047_02', 'c110048_01', 'c110049_01', 'c110049_02', 'c110050_01', 'c110051_01', 'c110052_01', 'c110052_03', 'c110053_01', 'c110053_02', 'c110054_01', 'c110056_01', 'c110058_01', 'c110063_01', 'c110063_02', 'c110064_01', 'c110066_01', 'c110067_01', 'c110252_01', 'c110253_01', 'c110254_01', 'c110255_01', 'c110255_02', 'c110256_01', 'c110257_01', 'c110257_02', 'c110258_01', 'c110259_01', 'c110260_01', 'c110261_01', 'c110263_01', 'c110264_01', 'c110265_01', 'c110266_01', 'c110267_01', 'c110268_01', 'c110269_01', 'c110269_02', 'c110270_01', 'c110274_01', 'c110275_01', 'c110276_01', 'c110277_01', 'c110280_01', 'c110281_01', 'c110291_01', 'c110299_01', 'c110301_01', 'c110301_02', 'c110302_01', 'c110303_01', 'c110304_01', 'c110305_01', 'c110307_01', 'c110310_01', 'c110311_01', 'c110312_01', 'c110313_01', 'c110314_01', 'c110315_01', 'c110316_01', 'c110317_01', 'c110318_01', 'c110319_01', 'c110325_01', 'c110326_01', 'c110327_01', 'c110328_01', 'c110333_01', 'c110334_01', 'c110335_01', 'c110336_01', 'c110337_01', 'c110340_01', 'c110341_01', 'c110342_01', 'c110344_01', 'c110349_01', 'c120018_01', 'c120019_01', 'c120121_01', 'c130005_01', 'c130005_02', 'c130005_03', 'c130005_04', 'c130005_05', 'c130006_01', 'c130006_02', 'c130006_03', 'c130006_04', 'c130006_05', 'c130007_01', 'c130007_02', 'c130007_03', 'c130007_04', 'c130007_05', 'c130008_01', 'c130008_02', 'c130008_03', 'c130008_04', 'c130008_05', 'c130009_01', 'c130009_02', 'c130009_03', 'c130009_04', 'c130009_05'].sort();
        this.state = {
            files: fn
        };

        const wikiURL = 'https://dragalialost.gamepedia.com/api.php?action=cargoquery&format=json&limit=500&tables=Adventurers&fields=Id,VariationId,Name';
        const request = new Request(wikiURL, {
            method: 'get',
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'credentials': "include"
            },
        });
        fetch(request).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    let newxIdMap = {};
                    for (let d of data.cargoquery) {
                        const id = d.title.Id;
                        const vid = parseInt(d.title.VariationId) > 10 ? d.title.VariationId : `0${d.title.VariationId}`;
                        const n = d.title.Name;
                        newxIdMap[`c${id}_${vid}`] = n;
                    }
                    this.setState({ idMap: newxIdMap });
                });
            }
        }).catch(err => {
            console.log(err);
        });

    }
    // componentDidUpdate(prevProps) {
    //     if (this.state.idMap === undefined) {
    //         this.setState({ idMap: this.props.idMap });
    //     }
    // }
    findName(fn) {
        if (this.state.idMap !== undefined && this.state.idMap.hasOwnProperty(fn)) {
            return this.state.idMap[fn];
        } else {
            return fn;
        }
    };
    render() {
        return (
            <div>
                {
                    this.state.files.map(fn => {
                        return (
                            <ul style={{ float: "left", width: "10%" }} key={fn}>
                                <li><Link to={`/${fn}/0`}>{this.findName(fn)}</Link></li>
                                <li><Link to={`/${fn}/1`}>{this.findName(fn)} Walk</Link></li>
                                <li><Link to={`/${fn}/2`}>{this.findName(fn)} Bob</Link></li>
                                {/* <li><Link to={`/${fn}/2`}>{fn} Dead</Link></li> */}
                            </ul>)
                    })
                }
            </div >
        )
    }
}

export default ModelList;