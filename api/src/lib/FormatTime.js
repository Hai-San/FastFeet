import { setSeconds, setMinutes, setHours } from 'date-fns';

class FormatTime {
    format(date, time) {
        const [hour = '00', minute = '00', second = '00'] = time.split(':');
        return setSeconds(setMinutes(setHours(date, hour), minute), second);
    }
}

export default new FormatTime().format;
