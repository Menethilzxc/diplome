import { ACTION_TYPE } from './action-type';

export const setRoomAvailable = (room) => ({
	type: ACTION_TYPE.SET_ROOM_AVAILABLE,
	payload: room,
});
