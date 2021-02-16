export const cancellablePromise = <T>(promise: Promise<T>) => {
  let isCanceled = false

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (value: T) =>
        isCanceled ? reject({ isCanceled, value }) : resolve(value),
      (error: Error) => reject({ isCanceled, error }),
    )
  })

  return {
    promise: wrappedPromise,
    cancel: () => (isCanceled = true),
  }
}

export const delay = (num: number) =>
  new Promise((resolve) => setTimeout(resolve, num))
