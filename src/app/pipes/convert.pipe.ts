import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'convert'
})
export class ConvertPipe implements PipeTransform {
  transform(value: number, from: number, to: number): number {
    return Number(Number(to / from * value).toFixed(3));
  }
}
