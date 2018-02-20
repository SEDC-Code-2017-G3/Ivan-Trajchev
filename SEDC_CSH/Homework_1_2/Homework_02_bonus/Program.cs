using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_02_bonus
{
    class Program
    {
        static void Main(string[] args)
        {
            //Exercise One----------------------------------------------------

            Console.WriteLine("\n----Excercise One: calculate string length---");
            Console.WriteLine("---------------------------------------------\n");

            Console.WriteLine("Enter a sentence: ");
            string str = Console.ReadLine();

            Console.WriteLine("\nString length with method 1 (null terminator): ");
            Console.WriteLine(StrLengthC(str));

            Console.WriteLine("\nString length with method 2 (foreach): ");
            Console.WriteLine(StrLengthForEach(str));

            //Exercise Two----------------------------------------------------
            Console.WriteLine("\n----Excercise Two: separate characters of a string---");
            Console.WriteLine("---------------------------------------------\n");

            foreach (string c in separateChars(str))
            {
                Console.Write(c + ' ');
            }
            Console.WriteLine();

            //Exercise Three----------------------------------------------------
            Console.WriteLine("\n----Excercise Three: Reverse string letters---");
            Console.WriteLine("---------------------------------------------\n");

            foreach (string c in reverseChars(str))
            {
                Console.Write(c + ' ');
            }
            Console.WriteLine();

            //Exercise Four----------------------------------------------------
            Console.WriteLine("\n----Excercise Four: Count words in a string---");
            Console.WriteLine("---------------------------------------------\n");

            Console.WriteLine(countWords(str));
        }

        // prv metod za string length so null terminator;
        static int StrLengthC(string str)
        {
            str += '\0';
            int counter = 1;
            while (str[counter] != '\0')
            {
                counter++;
            }
            return counter;
        }

        // vtor metod za string length so forech
        static int StrLengthForEach(string str)
        {
            int counter = 0;
            foreach (char c in str)
            {
                counter++;
            }
            return counter;
        }

        // oddeluvanje na karakteri od string
        static string[] separateChars(string str)
        {
            int length = StrLengthC(str);
            string[] charsArray = new string[length];

            for (int i = 0; i < length; i++)
            {
                charsArray[i] = str[i].ToString();
            }

            return charsArray;
        }

        // reversed string array
        static string[] reverseChars(string str)
        {
            int len = StrLengthC(str);
            string[] reversedArray = new string[len];

            for (int i = 0; i < len; i++)
            {
                reversedArray[len - 1 - i] = str[i].ToString();
            }

            return reversedArray;
        }

        static int countWords(string str)
        {

            int count = 1;

            for (int i = 0; i < StrLengthC(str); i++)
            {
                if(str[i] == ' ' || str[i] == '\n')
                {
                    count++;
                }

            }
            return count;
        }
    }
}
