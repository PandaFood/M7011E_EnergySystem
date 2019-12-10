

let batteryConfig = {
    scrollY:        '40vh',
    scrollCollapse: true,
    paging:         false
};
let batteryTable = $('#batteryTable').DataTable(batteryConfig);

function addBatteryRow(name, cap, max, fill){
    battery = $("#template-battery-row").clone();
    battery.removeAttr('id');
    battery.removeClass('odd');
    battery.addClass('battery-row');
    
    battery.find(".battery-name").html(name);
    battery.find(".battery-capacity").html(cap + " kWh");
    battery.find(".battery-max").html(max + " kWh");
    battery.find(".battery-fill").html(fill + " %");

    battery.show()
    batteryTable.row.add(battery).draw();
}

$(document).ready(function () {


    for(let i = 0; i <20; i++){

        addBatteryRow("Wasd" + i, 20, 30, 80 );
    }
    
});