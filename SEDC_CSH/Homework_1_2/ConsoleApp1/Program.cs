using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

namespace Homework_01
{
    class Program
    {
        static void Main(string[] args)
        {
            int width = 5;
            bool armsUp = false;
            while (true)
            {
                DrawMan(width, armsUp);
                Thread.Sleep(1000);
                Console.Clear();
                armsUp = !armsUp;
            }

        }

        static void DrawHead(int width, bool armsUp)
        {
            string str = "";
            if (!armsUp)
            {

                for (int i = 0; i < width - 1; i++)
                {
                    str = i != 1 ? new string(' ', width / 2 + 1) + '*' : " *" + new string(' ', width - 2) + '*';
                    Console.WriteLine(str);
                }
            }
            else
            {
                for (int i = 0; i < width - 2; i++)
                {
                    switch(i)
                    {
                        case 0:
                            str = new string(' ', width / 2 + 1) + '*';
                            break;
                        case 1:
                            str = new string(' ', width / 2 - i) + '*' + new string(' ', i * 3) + '*';
                            break;
                        default:
                            str = new string(' ', width / 2 - i) +
                                '*' + new string(' ', i) + '*' + new string(' ', i) + '*';
                            break;
                    }
                    Console.WriteLine(str);
                }
                

            }
        }

        static void DrawTorso(int width, bool armsUp)
        {
            string str;
            if (!armsUp)
            {
                for (int i = 0; i < width / 2; i++)
                {
                    str = new string(' ', width / 2 - i) +
                        '*' + new string(' ', i) + '*' + new string(' ', i) + '*';

                    Console.WriteLine(str);
                }
            }
            else
            {
                Console.WriteLine("  ***");
                for (int i = 0; i < width / 2; i++)
                {
                    str = new string(' ', width / 2 + 1) + '*';
                    Console.WriteLine(str);
                }
            }
            Console.WriteLine(new string(' ', width / 2 + 1) + '*');
        }

        static void DrawLegs(int width)
        {

            Console.WriteLine(new string(' ', width / 2 + 1) + '*');
            for (int i = 0; i < width / 2; i++)
            {
                Console.WriteLine(new string(' ', width / 2 - i) + '*' + new string(' ', i * 2 + 1) + '*');
            }
        }

        static void DrawMan(int width, bool armsUp)
        {
            DrawHead(width, armsUp);
            DrawTorso(width, armsUp);
            DrawLegs(width);
        }
    }
}
