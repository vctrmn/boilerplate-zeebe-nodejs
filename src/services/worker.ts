import { ZBClient, ZBWorkerTaskHandler } from 'zeebe-node';
import logger from '../plugins/logger';

const { ZEEBE_GATEWAY = 'localhost:26500', TASK_NAME = 'task-default' } = process.env;

const zbc = new ZBClient(ZEEBE_GATEWAY);

const handleTask: ZBWorkerTaskHandler = async (job) => {
    try {
        logger.info(`Processing task ${TASK_NAME}`);
        return job.complete();
    } catch (error) {
        logger.error(error);
        return job.fail(`Error on processing task ${TASK_NAME}`);
    }
};

const startWorker = (): void => {
    try {
        zbc.createWorker({
            taskType: TASK_NAME,
            taskHandler: handleTask,
            onReady: () => logger.info(`Worker connected`),
            onConnectionError: () => logger.warn(`Worker disconnected`),
        });
    } catch (error) {
        logger.error(error);
    }
};

export default startWorker;
