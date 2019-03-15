import { ITodoItem, ITodoItemWithKey, TodoList } from "./types/exampleTypes";

/**
 * Routes for the TODO app.
 *
 * #ExportRoute("/")
 */
export interface ITodoRoutes {
    /**
     * Create a new task.
     */
    "/todo/create": {
        /**
         * We use POST here.
         */
        "POST": {
            authorization: string;
            body: ITodoItem;
            response: {
                /**
                 * The server might respond with the id of the task.
                 */
                201: number;
                /**
                 * But if the server queues the task for insertion, maybe we just get a confirmation of success.
                 */
                202: undefined;
            }
        };
    };
    /**
     * Request a task by id.
     */
    "/todo/:id": {
        "GET": {
            param: {
                /**
                 * The id of the thing we request.
                 */
                id: number;
            };
            query: {
                /**
                 * Only return the result if it is not due already.
                 */
                ifNotDue?: boolean;
            }
            response: {
                /**
                 * The task we wanted.
                 */
                200: ITodoItemWithKey;
                /**
                 * The server does not know this task.
                 */
                404: undefined;
                /**
                 * The task was already due and thus could not be returned.
                 */
                417: undefined;
            }
        };
        "PUT": {
            authorization: string;
            param: {
                /**
                 * The id of the thing we request.
                 */
                id: number;
            };
            body: ITodoItem;
            response: {
                204: undefined;
                404: undefined;
            };
        };
        "DELETE": {
            authorization: string;
            response: {
                204: undefined;
                401: undefined;
                404: undefined;
            }
        };
    };
    "/todo/list": {
        "GET": {
            response: {
                200: TodoList;
            };
        };
    };
}