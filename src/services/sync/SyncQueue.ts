type SyncTask = () => Promise<void>;

class SyncQueue {
  private queue: SyncTask[];
  private isProcessing: boolean;

  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  async enqueue(syncTask: SyncTask): Promise<void> {
    this.queue.push(syncTask);
    if (!this.isProcessing) {
      await this.processQueue();
    }
    console.log("동기화 작업 대기 건수 :", this.queue.length);
  }

  private async processQueue(): Promise<void> {
    if (this.queue.length > 0 && !this.isProcessing) {
      this.isProcessing = true;
      const task = this.queue.shift();
      if (task) {
        try {
          await task();
        } catch (error) {
          console.error("동기화 작업 중 오류 발생 :", error);
        } finally {
          this.isProcessing = false;
          await this.processQueue();
        }
      }
    }
  }
}

export const syncQueue = new SyncQueue();
