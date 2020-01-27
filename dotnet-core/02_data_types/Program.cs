using System;
using System.Linq;

namespace _02_data_types {
  class Program {
    static void Main(string[] args) {
      // Number ---------------------------------------------------------------
      int a = 5;
      double b = a + 2.0;
      // String ---------------------------------------------------------------
      string aFriend = "Bill"; // Define
      Console.WriteLine("Hello " + aFriend); // Concat
      Console.WriteLine($"Hello { aFriend }"); // Interpolation
      // Lambda Expressions ---------------------------------------------------
      int[] numbers = { 1, 2, 3 };
      var doubles = numbers.Select(n => n * 2).ToArray();
      Console.WriteLine("Doubled numbers = " + string.Join(", ", doubles));
      // Tuple ----------------------------------------------------------------
      var tuple = (11, 22);
      int t2;
      (_, t2) = tuple;
      Console.WriteLine("tuple Item1 = " + tuple.Item1 + ", Item2 = " + t2);
      // LINQ -----------------------------------------------------------------
      var limit = 3;
      int[] source = { 0, 1, 2, 3, 4, 5 };
      var query = from item in source
                  where item < limit
                  select item;
      Console.WriteLine($"LINQ result: [{ string.Join(", ", query) }]");
      // End ------------------------------------------------------------------
    }
  }
}
