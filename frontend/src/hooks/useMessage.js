import bus from '../utils/bus';

export default function useMessage() {
    function message(message, type) {
        bus.emit('flash', { message:message, type: type});
    }
    return { message };
}