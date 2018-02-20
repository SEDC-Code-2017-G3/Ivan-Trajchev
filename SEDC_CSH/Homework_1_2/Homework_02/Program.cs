using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_02
{
    class Program
    {
        static void Main(string[] args)
        {
            double input;
            while(!double.TryParse(Console.ReadLine(), out input))
            {
                Console.WriteLine("Invalid Number!");
            }
            Console.WriteLine(Ceil(input)); 

        }

        static int Ceil(double input)
        {
            return (int)input + 1;
        }
    }
}
