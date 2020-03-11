import Bee from 'bee-queue';
import OrderRegisterMail from '../app/jobs/OrderRegisterMail';
import OrderCancelMail from '../app/jobs/OrderCancelMail';
import redisConfig from '../config/redis';

const jobs = [OrderRegisterMail, OrderCancelMail];

class Queue {
    constructor() {
        this.queues = {};

        this.init();
    }

    init() {
        jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
                bee: new Bee(key, {
                    redis: redisConfig,
                }),
                handle,
            };
        });
    }

    add(queue, job) {
        return this.queues[queue].bee.createJob(job).save();
    }

    processQueue() {
        jobs.forEach(job => {
            const { bee, handle } = this.queues[job.key];

            bee.on('failed', this.handleFailture).process(handle);
        });
    }

    handleFailture(job, err) {
        console.log(`Queue ${job.queue.name}: FAILED`, err);
    }
}

export default new Queue();
