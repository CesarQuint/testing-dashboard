import Moment from 'moment'
import Numeral from 'numeral'

Moment.updateLocale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sept_Oct_Nov_Dic'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom_Lun_Mar_Mier_Jue_Vier_Sab'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
})

export default {
    translate,
    dateLarge,
    dateTime,
    dateTimeLarge,
    cash,
    relevance
}

function translate(value) {
    switch(value) {
        case 'admin': return 'Administrador'
        case 'disabled': return 'Deshabilitado'
        case 'enabled': return 'Habilitado'
        case 'error': return 'Error'
        case 'success': return 'Finalizado'
        case 'user': return 'Usuario'
        default: return value
    }
}

function dateLarge(date) {
    return Moment(date).locale('es').format('dddd DD MMMM YYYY')
}

function dateTime(date) {
    return Moment(date).locale('es').format('DD/MMMM/YY hh:mm A')
}

function dateTimeLarge(date) {
    return Moment(date).locale('es').format('dddd DD MMMM YYYY hh:mm A')
}

function cash(value) {
    return Numeral(value).format('$ 0,0.00')
}

function relevance(value){
    let numbers = value.split("T")
    let result = numbers[0].split("-")

    let current = Moment().format().split("T")
    let fncn = current[0].split("-")

    let calculo = Moment(result)
    return calculo.diff(fncn,'days')
}

