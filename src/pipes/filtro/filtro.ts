import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FiltroPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string,limite: string): string {
    return value.toLowerCase();
  }
}
