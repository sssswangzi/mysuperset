import echarts from 'echarts';
import d3 from 'd3';


//代码1
function newDisPieViz(slice, payload) {
    var arr = payload.data;
    var name = new Array();
    var value = new Array();
    var title;
    var subtitle;
    for (var i = 0; i < arr.length; i++) {

        if (arr[i].name == "新经销商") {

            name[0] = arr[i].name + "(" + arr[i].value + ")";
            value[0] = {
                value: arr[i].value,
                name: name[0],
                tip: "N"
            };
            title = "2018年合作的新经销商";
            subtitle = "2018年农夫山泉合作的新经销商";
        }
        if (arr[i].name == "老经销商") {

            name[1] = arr[i].name + "(" + arr[i].value + ")";
            value[1] = {
                value: arr[i].value,
                name: name[1],
                tip: "O"
            };
        }

        if (arr[i].name == "达成目标") {

            name[0] = arr[i].name + "(" + arr[i].value + ")";
            value[0] = {
                value: arr[i].value,
                name: name[0],
                tip: "O"
            };
            title = "17年和18年累计达成率均超过100%";
            subtitle = "17年和18年农夫山泉累计达成率均超过100%的经销商";

        }
        ;
        if (arr[i].name == "未达成目标") {

            name[1] = arr[i].name + "(" + arr[i].value + ")";
            value[1] = {
                value: arr[i].value,
                name: name[1],
                tip: "O"
            };
        }
    }
    const div = d3.select(slice.selector);
    const slice_id = "echarts_slice_" + slice.formData.slice_id;
    const html = '<div id=' + slice_id + ' style="width: ' + slice.width() + '' +
        'px;height:' + slice.height() + 'px;"></div>';
    div.html(html); // reset
    const newDistributorPieChart = echarts.init(document.getElementById(slice_id));

    const newDistributorPieChartData = {

        title: {
            text: title,
            subtext: subtitle,
            x: "center"
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {d}%"
        },
        legend: {
            // orient: "vertical",
            y: "bottom",
            data: name
        },
        calculable: false,
        series: [{
            name: "2018年合作的新经销商",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: value
        }]
    };

    newDistributorPieChart.setOption(newDistributorPieChartData);
    newDistributorPieChart.resize();

    function newDistributorPieChartClick(param) {
        var distributorFlag = {eventName:"distributorFlag",eventData:param.data.tip};
        parent.postMessage(distributorFlag, '*');
        // window.open("distributorFlagList.html?distributorFlag=" + encodeURI(distributorFlag));
    }

    newDistributorPieChart.on("click", newDistributorPieChartClick);
}

module.exports = newDisPieViz;