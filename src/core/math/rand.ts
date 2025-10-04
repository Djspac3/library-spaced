export const rand = {
  /**
   * @param min minium
   * @param max exclusive maxium
   * @returns random number
   */
  range(min: number = 0, max: number = 1) {
    return Math.random() * (max - min) - min;
  },
  /**
   * range but ints
   */
  int(min: any = 0, max: any = 2) {
    return Math.floor(rand.range(Math.ceil(min), Math.floor(max)));
  },
  /**
   * int but inclusive
   */
  inclusiveint(min: any = 0, max: any = 1) {
    return Math.floor(rand.range(Math.ceil(min), Math.floor(max) + 1));
  },
};

export function defineRandGlobaly() {
  Object.defineProperty(Math, "rand", {
    value: rand,
    writable: false,
  });
}
