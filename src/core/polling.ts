import Core from '@repandrip/core'
import { sleep } from '../lib'
import { Context } from './context'
import { PollingWorker } from './worker'

export class Polling {
  public constructor (client: Core.Client, context?: Context) {
    this.client = client
    this.workers = []

    this.context = context || (() => {
      const contextData: { [key: string]: any } = {}
      const context: Context = {
        get: (key) => contextData[key],
        set: (key, value) => { (contextData[key] = value) },

        isset: (key) => key in contextData,
        unset: (key) => { delete contextData[key] }
      }

      return context
    })()
  }

  public readonly client: Core.Client
  public readonly workers: Array<PollingWorker>
  public readonly context: Context

  public async run () {
    const { workers, client } = this
    const runningWorkers: Array<PollingWorker> = []

    while (true) {
      for (const worker of workers) {
        if (!runningWorkers.find((runningWorker) => runningWorker === worker)) {
          const service = async () => {
            while (true) {
              if (!runningWorkers.find((runningWorker) => runningWorker === worker)) {
                if (!workers.find((entry) => entry === worker)) {
                  break
                }

                runningWorkers.push(worker)
              } else if (!workers.find((entry) => entry === worker)) {
                break
              }

              try {
                await worker.update()
              } catch (error: any) {
                client.log('Polling', error.stack)
              }
              await sleep(worker.interval)
            }
          }

          runningWorkers.push(worker)
          service()
        }
      }

      await sleep(1000)
    }
  }

  public async add (worker: PollingWorker) {
    this.workers.push(worker)
  }

  public async remove (worker: PollingWorker) {
    const { workers } = this

    const workerIndex = workers.indexOf(worker)
    if (workerIndex > -1) {
      workers.splice(workerIndex, 1)
    }
  }
}
