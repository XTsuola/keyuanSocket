// deno-lint-ignore-file
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

const dinwei = [81,82,83,84]

export async function yidongguocheng(
    x: number,
    y: number,
    x1: number,
    y1: number,
    id: number,
    level: number,
) {
    const res: any = await axiod.get("http://110.40.151.228:7147/mota/getMap/");
    let map = res.data.rows;
    if (map.list[level][x1][y1] == 0) { // 通路
        map.list[level][x1][y1] = id;
        map.list[level][x][y] = 0;
    } else if (map.list[level][x1][y1] == 31) { // 金色钥匙
        map.list[level][x1][y1] = id;
        map.list[level][x][y] = 0;
        map.role[dinwei.findIndex(item => item == id)].jys++;
    } else if (map.list[level][x1][y1] == 32) { // 银色钥匙
        map.list[level][x1][y1] = id;
        map.list[level][x][y] = 0;
        map.role[dinwei.findIndex(item => item == id)].yys++;
    } else if (map.list[level][x1][y1] == 21) { // 金色门
        if (map.role[dinwei.findIndex(item => item == id)].jys > 0) {
            map.list[level][x1][y1] = id;
            map.list[level][x][y] = 0;
            map.role[dinwei.findIndex(item => item == id)].jys--;
        }
    } else if (map.list[level][x1][y1] == 22) { // 银色门
        if (map.role[dinwei.findIndex(item => item == id)].yys > 0) {
            map.list[level][x1][y1] = id;
            map.list[level][x][y] = 0;
            map.role[dinwei.findIndex(item => item == id)].yys--;
        }
    } else if (map.list[level][x1][y1] == 51) { // 上楼梯
        if (map.list[level + 1][x][y] != 81 && map.list[level + 1][x][y] != 82 && map.list[level + 1][x][y] != 83 && map.list[level + 1][x][y] != 84 && map.list[level + 1][x][y] != 1) {
            map.list[level][x][y] = 0;
            map.list[level + 1][x][y] = id;
            await axiod.post(
                "http://110.40.151.228:7147/mota/updateLevel/",
                {
                    id: id,
                    level: level + 1
                },
            );
            map = levelUp(map, id)
        } else if (map.list[level + 1][x1 - 1] != undefined && map.list[level + 1][x1 - 1][y1] != undefined && map.list[level + 1][x1 - 1][y1] != 81 && map.list[level + 1][x1 - 1][y1] != 82 && map.list[level + 1][x1 - 1][y1] != 83 && map.list[level + 1][x1 - 1][y1] != 84 && map.list[level + 1][x1 - 1][y1] != 1) {
            map.list[level][x][y] = 0;
            map.list[level + 1][x1 - 1][y1] = id;
            await axiod.post(
                "http://110.40.151.228:7147/mota/updateLevel/",
                {
                    id: id,
                    level: level + 1
                },
            );
            map = levelUp(map, id)
        } else if (map.list[level + 1][x1][y1 - 1] != undefined && map.list[level + 1][x1][y1 - 1] != 81 && map.list[level + 1][x1][y1 - 1] != 82 && map.list[level + 1][x1][y1 - 1] != 83 && map.list[level + 1][x1][y1 - 1] != 84 && map.list[level + 1][x1][y1 - 1] != 1) {
            map.list[level][x][y] = 0;
            map.list[level + 1][x1][y1 - 1] = id;
            await axiod.post(
                "http://110.40.151.228:7147/mota/updateLevel/",
                {
                    id: id,
                    level: level + 1
                },
            );
            map = levelUp(map, id)
        } else if (map.list[level + 1][x1 + 1] != undefined && map.list[level + 1][x1 + 1][y1] != undefined && map.list[level + 1][x1 + 1][y1] != 81 && map.list[level + 1][x1 + 1][y1] != 82 && map.list[level + 1][x1 + 1][y1] != 83 && map.list[level + 1][x1 + 1][y1] != 84 && map.list[level + 1][x1 + 1][y1] != 1) {
            map.list[level][x][y] = 0;
            map.list[level + 1][x1 + 1][y1] = id;
            await axiod.post(
                "http://110.40.151.228:7147/mota/updateLevel/",
                {
                    id: id,
                    level: level + 1
                },
            );
            map = levelUp(map, id)
        } else if (map.list[level + 1][x1][y1 + 1] != undefined && map.list[level + 1][x1][y1 + 1] != 81 && map.list[level + 1][x1][y1 + 1] != 82 && map.list[level + 1][x1][y1 + 1] != 83 && map.list[level + 1][x1][y1 + 1] != 84 && map.list[level + 1][x1][y1 + 1] != 1) {
            map.list[level][x][y] = 0;
            map.list[level + 1][x1][y1 + 1] = id;
            await axiod.post(
                "http://110.40.151.228:7147/mota/updateLevel/",
                {
                    id: id,
                    level: level + 1
                },
            );
            map = levelUp(map, id)
        }
    } else if (map.list[level][x1][y1] == 52) { // 下楼梯
        if (map.list[level - 1][x][y] != 81 && map.list[level - 1][x][y] != 82 && map.list[level - 1][x][y] != 83 && map.list[level - 1][x][y] != 84 && map.list[level - 1][x][y] != 1) {
            map.list[level][x][y] = 0;
            map.list[level - 1][x][y] = id;
            await axiod.post(
                "http://110.40.151.228:7147/mota/updateLevel/",
                {
                    id: id,
                    level: level - 1
                },
            );
            map = levelDown(map, id)
        } else if (map.list[level - 1][x1 - 1] != undefined && map.list[level - 1][x1 - 1][y1] != undefined && map.list[level - 1][x1 - 1][y1] != 81 && map.list[level - 1][x1 - 1][y1] != 82 && map.list[level - 1][x1 - 1][y1] != 83 && map.list[level - 1][x1 - 1][y1] != 84 && map.list[level - 1][x1 - 1][y1] != 1) {
            map.list[level][x][y] = 0;
            map.list[level - 1][x1 - 1][y1] = id;
            await axiod.post(
                "http://110.40.151.228:7147/mota/updateLevel/",
                {
                    id: id,
                    level: level - 1
                },
            );
            map = levelDown(map, id)
        } else if (map.list[level - 1][x1][y1 - 1] != undefined && map.list[level - 1][x1][y1 - 1] != 81 && map.list[level - 1][x1][y1 - 1] != 82 && map.list[level - 1][x1][y1 - 1] != 83 && map.list[level - 1][x1][y1 - 1] != 84 && map.list[level - 1][x1][y1 - 1] != 1) {
            map.list[level][x][y] = 0;
            map.list[level - 1][x1][y1 - 1] = id;
            await axiod.post(
                "http://110.40.151.228:7147/mota/updateLevel/",
                {
                    id: id,
                    level: level - 1
                },
            );
            map = levelDown(map, id)
        } else if (map.list[level - 1][x1 + 1] != undefined && map.list[level - 1][x1 + 1][y1] != undefined && map.list[level - 1][x1 + 1][y1] != 81 && map.list[level - 1][x1 + 1][y1] != 82 && map.list[level - 1][x1 + 1][y1] != 83 && map.list[level - 1][x1 + 1][y1] != 84 && map.list[level - 1][x1 + 1][y1] != 1) {
            map.list[level][x][y] = 0;
            map.list[level - 1][x1 + 1][y1] = id;
            await axiod.post(
                "http://110.40.151.228:7147/mota/updateLevel/",
                {
                    id: id,
                    level: level - 1
                },
            );
            map = levelDown(map, id)
        } else if (map.list[level - 1][x1][y1 + 1] != undefined && map.list[level - 1][x1][y1 + 1] != 81 && map.list[level - 1][x1][y1 + 1] != 82 && map.list[level - 1][x1][y1 + 1] != 83 && map.list[level - 1][x1][y1 + 1] != 84 && map.list[level - 1][x1][y1 + 1] != 1) {
            map.list[level][x][y] = 0;
            map.list[level - 1][x1][y1 + 1] = id;
            await axiod.post(
                "http://110.40.151.228:7147/mota/updateLevel/",
                {
                    id: id,
                    level: level - 1
                },
            );
            map = levelDown(map, id)
        }
    } else if (map.list[level][x1][y1] == 61) { // 开启宝箱61号
        if (map.role[dinwei.findIndex(item => item == id)].bxys > 0) {
            map.list[level][x1][y1] = id;
            map.list[level][x][y] = 0;
            map.role[dinwei.findIndex(item => item == id)].bxys--;
            map.role[dinwei.findIndex(item => item == id)].clueList.push("获得火把");
        }
    } else if (map.list[level][x1][y1] == 62) { // 开启宝箱62号
        if (map.role[dinwei.findIndex(item => item == id)].bxys > 0) {
            map.list[level][x1][y1] = id;
            map.list[level][x][y] = 0;
            map.role[dinwei.findIndex(item => item == id)].bxys--;
            map.role[dinwei.findIndex(item => item == id)].clueList.push("获得食物");
        }
    }

    return map;
}

function levelUp(map: any, id: number) { // 楼层提升
    if (id == 81) {
        map.role[0].level += 1
    } else if (id == 82) {
        map.role[1].level += 1
    } else if (id == 83) {
        map.role[2].level += 1
    } else if (id == 84) {
        map.role[3].level += 1
    }
    return map
}

function levelDown(map: any, id: number) { // 楼层降低
    if (id == 81) {
        map.role[0].level -= 1
    } else if (id == 82) {
        map.role[1].level -= 1
    } else if (id == 83) {
        map.role[2].level -= 1
    } else if (id == 84) {
        map.role[3].level -= 1
    }
    return map
}