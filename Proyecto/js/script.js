$(document).ready(function() {
    $('#descripcion').summernote({
        placeholder: 'Escribe aquí...',
        height: 200,
        toolbar: [
            ['font', ['fontname']],
            ['style', ['bold', 'italic', 'underline']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['paragraph']]
        ],
        fontNames: [
            'Arial', 'Times New Roman', 
            'Courier New', 'Verdana', 
            'Georgia'
        ],
        fontSizes: ['8', '10', '12', '14', '18'],
        colors: [
            ['#000000', '#434343', '#666666', '#999999', '#cccccc'],
            ['#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff'],
            ['#0000ff', '#9900ff', '#ff00ff', '#ff0033', '#FF5733'],
            ['#957cb2', '#45b8ac', '#d0c101', '#f28123', '#eb0a0a'],
            ['#ffffff', '#f1f1f1', '#f8f8f8', '#fcfcfc', '#e6e6e6']
        ]
    });

    $('.btn-cerrar').click(function() {
        if (confirm('¿Estás seguro de que quieres cerrar el formulario?')) {
            window.close();
        }
    });

    $('.btn-minimizar').click(function() {
        $('.contenido-formulario').slideToggle();
    });

    $('.btn-cancelar').click(function() {
        if (confirm('¿Deseas cancelar y descartar los cambios?')) {
            $('#formReup')[0].reset();
            $('#descripcion').summernote('reset');
        }
    });

    $('.btn-aplicar').click(function() {
        if (validarFormulario()) {
            const datos = obtenerDatosFormulario();
            console.log("Datos aplicados:", datos);
            alert("Cambios aplicados correctamente");
        }
    });

    $('#formReup').submit(function(e) {
        e.preventDefault();
        if (validarFormulario()) {
            const datos = obtenerDatosFormulario();
            console.log("Datos guardados:", datos);
            alert("Formulario guardado correctamente");
        }
    });

    function validarFormulario() {
        let valido = true;
        $('input[required]').each(function() {
            if (!$(this).val()) {
                $(this).addClass('is-invalid');
                valido = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        return valido;
    }

    function obtenerDatosFormulario() {
        return {
            denominacion: $('#denominacion').val(),
            codigoReup: $('#codigoReup').val(),
            abreviatura: $('#abreviatura').val(),
            fechaInicio: $('#fechaInicio').val(),
            fechaFin: $('#fechaFin').val(),
            propio: $('#propio').is(':checked'),
            descripcion: $('#descripcion').summernote('code')
        };
    }
});