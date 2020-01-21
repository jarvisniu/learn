using System;
using System.IO;

namespace _02_data_types
{
  class Program
  {
    static void Main(string[] args)
    {
      // String
      string aFriend = "Bill";
      Console.WriteLine("Hello " + aFriend);
      // String Interpolation
      Console.WriteLine($"Hello { aFriend }");
      // Write Text File
      using (var writer = File.OpenWrite("./friend.txt"))
      {
        var bytes = System.Text.Encoding.UTF8.GetBytes(aFriend);
        writer.Write(bytes);
      }
    }
  }
}
