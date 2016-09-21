; (() => {
    Vue.config.delimiters = ["{*", "*}"];
    var todo = {
        vue: new Vue({
            el: '#app',
            data: {
                todos: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            }
        }),
        init: () => {
            todo.getNumb(16);
            todo.binds();

        },
        getNumb: (x) => {
            var first = Math.ceil(Math.random() * x) - 1;
            var secend;
            while (true) {
                secend = Math.ceil(Math.random() * x) - 1;
                if (secend != first) {
                    break;
                }
            }
            var list = $.extend([], todo.vue.todos);
            var j = -1;
            for (var i = 0; i < list.length; i++) {
                if (list[i] == 0) {
                    j++;
                }
                if (j == first) { 
                    list[i] = 2;
                    first = -1;
                }
                if (j == secend) { 
                    list[i] = 2;
                    secend = -1;
                }
            }
            todo.vue.todos = list;
        },
        fng: (start, end) => {
            const chaX = start.x - end.x;
            const chaY = start.y - end.y;
            if (chaY > 0 && chaY > 50) {
                if (chaX < 0) {
                    if (-chaX > chaY) {
                        return 1; //右
                    } else {
                        return 2; //上
                    }
                } else if (chaX > 0) {
                    if (chaX > chaY) {
                        return 3; //左
                    } else {
                        return 2; //上
                    }
                } else {
                    return 2;
                }
            } else if (chaY < 0 && chaY < -50) {
                if (chaX < 0) {
                    if (-chaX > -chaY) {
                        return 1; //右
                    } else {
                        return 4; //下
                    }
                } else if (chaX > 0) {
                    if (chaX > -chaY) {
                        return 3; //左
                    } else {
                        return 4; //下
                    }
                } else {
                    return 4; //下
                }
            } else {
                if (chaX > 50 || chaX < -50) {
                    if (chaX > 0) {
                        return 3; //左
                    } else {
                        return 1; //右
                    }
                }
            }
        },
        changeNum: (to) => {
            var todoList = $.extend([], todo.vue.todos);
            var list;
            // var list = [1, '右', '上', '左', '下'];
            if (to == 1) {
                list = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]];
            } else if (to == 4) {
                list = [[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15]];
            } else if (to == 2) {
                list = [[12, 8, 4, 0], [13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3]];
            } else if (to == 3) {
                list = [[3, 2, 1, 0], [7, 6, 5, 4], [11, 10, 9, 8], [15, 14, 13, 12]];
            }
            for (var i = 0; i < 4; i++) {
                var thislist = list[i];
                var x = 3, y = 3;
                while (true) {
                    if (todoList[thislist[x - 1]] != 0) {
                        if (todoList[thislist[y]] != 0) {
                            if (todoList[thislist[y]] == todoList[thislist[x - 1]]) {
                                todoList[thislist[y]] *= 2;
                                todoList[thislist[x - 1]] = 0;
                            }
                        } else {
                            if (todoList[thislist[y + 1]] == todoList[thislist[x - 1]]) {
                                todoList[thislist[y + 1]] = todoList[thislist[y + 1]] * 2;
                                todoList[thislist[x - 1]] = 0;
                            } else {
                                todoList[thislist[y]] = todoList[thislist[x - 1]];
                                todoList[thislist[x - 1]] = 0;
                            }
                            
                        }
                        x = y;
                        y--;
                    }
                    x--;
                    if (x == 0) {
                        break;
                    }
                }
            }
            todo.vue.todos = todoList;
        },
        binds: () => {
            var start = {};
            $('ul').on('touchstart', (e) => {
                start = {
                    x: e.originalEvent.changedTouches[0].screenX,
                    y: e.originalEvent.changedTouches[0].screenY
                }
            }).on('touchend', (e) => {
                var end = {
                    x: e.originalEvent.changedTouches[0].screenX,
                    y: e.originalEvent.changedTouches[0].screenY
                }
                todo.changeNum(todo.fng(start, end));
                var list_0 = todo.vue.todos.filter((x) => { 
                    return x == 0;
                })
                todo.getNumb(list_0.length);
                if((todo.vue.todos.filter((x) => { 
                    return x == 0;
                })).length==0) {
                    alert('Game over!');
                }
            }).on('touchmove', (e) => {
                e.preventDefault();
            })
        }
    };
    todo.init();
})();