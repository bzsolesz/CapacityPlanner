import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ParamMap, convertToParamMap, Data } from "@angular/router";
import { Observable } from "rxjs/Observable";

export class ActivatedRouteStub {
  private _testParamMap: ParamMap;
  private _testData: Data;
  private paramSubject: BehaviorSubject<ParamMap> = new BehaviorSubject(this._testParamMap);
  private dataSubject: BehaviorSubject<Data> = new BehaviorSubject(this._testData);

  public paramMap: Observable<ParamMap> = this.paramSubject.asObservable();
  public data: Observable<Data> = this.dataSubject.asObservable();

  set testParamMap(params: {}) {
    this._testParamMap = convertToParamMap(params);
    this.paramSubject.next(this._testParamMap);
  }

  set testData(data: {}) {
    this._testData = data;
    this.dataSubject.next(this._testData);
  }
}
