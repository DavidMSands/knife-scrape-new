import { inject } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { CompareLinkService } from './compare-link.service';
import { CompareLinkResult } from "../../../interfaces/compare-link-result.interface";
import { catchError, of, pipe, switchMap, tap } from "rxjs";

type CompareLinkState = {
  result: CompareLinkResult | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: CompareLinkState = {
  result: null,
  isLoading: false,
  error: null
};

export const compareLinkStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, compareLinkService = inject(CompareLinkService)) => ({
    compareLink: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((link) =>
          compareLinkService.compareLink(link).pipe(
            tap((result) => {
              patchState(store, {
                result,
                isLoading: false,
                error: null
              });
            }),
            catchError((error) => {
              patchState(store, {
                isLoading: false,
                error: error?.message || 'Unknown error occurred'
              });
              return of(null);
            })
          )
        )
      )
    ),
    clear: () => {
      patchState(store, { result: null, error: null, isLoading: false });
    }
  }))
);
