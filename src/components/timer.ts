import { Component } from '@jakeklassen/ecs';

export class Timer extends Component {
  constructor(
    public duration: number,
    public tickRate = 1000,
    public startTime = performance.now(),
    public currentTime = startTime,
    public delta = 0,
    public progress = 0,
    public completed = false
  ) {
    super();
  }
}
