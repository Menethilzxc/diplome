import { ACTION_TYPE } from './action-type';

export const setRoomAvailable = (roomId) => ({
	type: 'SET_ROOM_AVAILABLE',
	payload: roomId,
});
