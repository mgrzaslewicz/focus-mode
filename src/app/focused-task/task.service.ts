import {Injectable, OpaqueToken} from '@angular/core';

export interface TaskService {

}

export const TaskServiceToken = new OpaqueToken('taskService');

@Injectable()
export class CookieTaskService implements TaskService {

}
