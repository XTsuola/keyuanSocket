import {
  WebSocketClient,
  WebSocketServer,
} from "https://deno.land/x/websocket@v0.1.4/mod.ts";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

async function yidongguocheng(
  x: number,
  y: number,
  x1: number,
  y1: number,
  id: number,
  level: number,
) {
  const res: any = await axiod.get("http://127.0.0.1:7147/mota/getMap/");
  const map = res.data.rows;
  if (map.list[level][x1][y1] == 0) { // 通路
    map.list[level][x1][y1] = id;
    map.list[level][x][y] = 0;
  } else if (map.list[level][x1][y1] == 31) { // 金色钥匙
    map.list[level][x1][y1] = id;
    map.list[level][x][y] = 0;
    map.jys++;
  } else if (map.list[level][x1][y1] == 32) { // 银色钥匙
    map.list[level][x1][y1] = id;
    map.list[level][x][y] = 0;
    map.yys++;
  } else if (map.list[level][x1][y1] == 21) { // 金色门
    if (map.jys > 0) {
      map.list[level][x1][y1] = id;
      map.list[level][x][y] = 0;
      map.jys--;
    }
  } else if (map.list[level][x1][y1] == 22) { // 银色门
    if (map.yys > 0) {
      map.list[level][x1][y1] = id;
      map.list[level][x][y] = 0;
      map.yys--;
    }
  } else if (map.list[level][x1][y1] == 51) { // 上楼梯
    map.list[level][x][y] = 0;
    map.list[level + 1][x][y] = id;
  } else if (map.list[level][x1][y1] == 52) { // 下楼梯
    map.list[level][x][y] = 0;
    map.list[level - 1][x][y] = id;
  } /* else if(map.list[map.level][x1][y1] == 41) { // 怪物1
		const data = {gj:10,sm:20}
	 	const res = await shjisuan({gj:10,sm:20})
		console.log(res, "resss")
		map.sm -= res
		if(map.sm <= 0) {
			show.value = true
			map.list[map.level][x1][y1] = 0;
			map.list[map.level][x][y] = 0;
			dieFlag = true
		} else {
			map.list[map.level][x1][y1] = id;
			map.list[map.level][x][y] = 0;
		}
	} */

  return map;
}

const wss = new WebSocketServer(7003);
const list: number[] = [];
const objList: any = [];
wss.on("connection", function (ws: WebSocketClient) {
  ws.on("message", async function (message: string) {
    if (message != "undefined") {
      const params = JSON.parse(message);
      console.log(params, "params");
      if (params.connect == true) {
        const ind = list.findIndex((item: number) => item == params.id);
        if (ind == -1) {
          list.push(params.id);
          objList.push(ws);
        } else {
          objList.splice(ind, 1, ws);
        }
      } else {
        const map = await yidongguocheng(
          params.peoplex,
          params.peopley,
          params.peoplex1,
          params.peopley1,
          params.id,
          params.level,
        );

        const res = await axiod.post(
          "http://127.0.0.1:7147/mota/saveMap/",
          map,
        );
        if (res.data.code == 200) {
          const res2 = await axiod.get("http://127.0.0.1:7147/mota/getMap/");
          for (let i = 0; i < list.length; i++) {
            objList[i].send(JSON.stringify(res2.data));
          }
        } else {
          console.log("修改失败");
        }
      }
    } else {
      console.log(message);
    }
  });
});
