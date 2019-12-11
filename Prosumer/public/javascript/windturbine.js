let windConfig = {
    scrollY: '40vh',
    scrollCollapse: true,
    paging: false
};
let windTable = $('#windTable').DataTable(windConfig);

function addWindRow(id, name, speed, prod, status) {
    turbine = $('#template-turbine-row').clone();
    turbine.removeAttr('id');
    turbine.removeClass('odd');
    turbine.addClass('turbine-row');
    turbine.attr('id', id);

    turbine.find('.turbine-name').html(name);
    turbine.find('.turbine-speed').html(speed + 'm/s');
    turbine.find('.turbine-production').html(prod + 'kWh');
    turbine.find('.turbine-status').html('<i class="fas fa-blender-phone"></i> ' + status);

    turbine.show()
    windTable.row.add(turbine).draw();
}

function updateWindRow(id, data) {
    turbine = $('#'+id);
    
    turbine.find('.turbine-name').html(data.name);
    turbine.find('.turbine-speed').html(data.speed + 'm/s');
    turbine.find('.turbine-production').html(data.power + 'kWh');

    if(data.status == 'running'){
        turbine.find('.turbine-speed').html(data.speed + ' m/s');
        turbine.find('.turbine-production').html(data.power + ' kWh');
        turbine.find('.turbine-status').html('<i class="fas fa-blender-phone"></i> ' + data.status);
    }else{
        turbine.find('.turbine-speed').html('---');
        turbine.find('.turbine-production').html('---');
        turbine.find('.turbine-status').html('<i class="fas fa-exclamation-circle"></i> ' + data.status);
    }
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  


$(document).ready(function () {
    let id = uuidv4();
    for (let i = 0; i < 20; i++) {
        if(i === 0){
            addWindRow(id, 'qwrty', 10, 20, 'running');
        }else{
            addWindRow(uuidv4(), 'Wasd' + i, 10, 20, 'running');
        }
    }

    setInterval(function(){
        let updateValues = {
            speed: Math.floor(Math.random() * 15),
            power: Math.floor(Math.random() * 20),
            status: 'running'
        }

        updateWindRow(id, updateValues);
    }, 1000);
});
