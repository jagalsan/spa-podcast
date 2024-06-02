import { BehaviorSubject } from 'rxjs';

class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  get loading$() {
    return this.loadingSubject.asObservable();
  }

  setLoading(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }
}

export const loadingService = new LoadingService();