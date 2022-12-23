import { Jojoca } from "./Jojoca";

describe("Jojoca.ts", () => {
  describe("getWrappedFunction", () => {
    it("calls the original function (no parameters)", () => {
      const jojoca = new Jojoca();
      const aFunction = jest.fn(() => {
        return null;
      });

      const wrappedFunction = jojoca.getWrappedFunction(aFunction);
      wrappedFunction();
      expect(aFunction).toHaveBeenCalledTimes(1);
    });

    it("calls the original function (with arguments)", () => {
      const jojoca = new Jojoca();
      const aFunction = jest.fn(() => {
        return null;
      });
      const randomArgument = 1;
      const anotherRandomArgument = "something";

      const wrappedFunction = jojoca.getWrappedFunction(aFunction);
      wrappedFunction(randomArgument, anotherRandomArgument);
      expect(aFunction).toHaveBeenCalledWith(
        randomArgument,
        anotherRandomArgument
      );
    });

    it("does not throw even if original function should throw", () => {
      const jojoca = new Jojoca();
      const aFunction = jest.fn(() => {
        throw new Error("I failed");
      });

      const wrappedFunction = jojoca.getWrappedFunction(aFunction);
      expect(() => wrappedFunction()).not.toThrowError();
    });

    it("allows error analysis and error through a callback", () => {
      const jojoca = new Jojoca();
      const aFunction = jest.fn(() => {
        throw new Error("I failed");
      });
      const errorCallback = jest.fn((e: Error) => {
        console.log(e);
        expect(e.name).toBe("Error");
        expect(e.message).toBe("I failed");
      });

      const wrappedFunction = jojoca.getWrappedFunction(
        aFunction,
        errorCallback
      );
      expect(() => wrappedFunction()).not.toThrowError();
      expect(errorCallback).toHaveBeenCalledTimes(1);
    });
  });
});
