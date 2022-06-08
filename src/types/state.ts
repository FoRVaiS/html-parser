type State = {
  cursor: number
  data: string
}

export type Stateful<T> = (state: State) => T
