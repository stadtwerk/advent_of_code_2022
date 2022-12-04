import java.io.File;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {

    public static void main (String[] args){
      Main main = new Main();
      int answer1 = 0;
      int answer2 = 0;

        try {
            File f = new File("04-JP/input.txt");
            Scanner myReader = new Scanner(f);

            while (myReader.hasNextLine()) {
              ArrayList<Integer> range = new ArrayList<>();
              String data = myReader.nextLine();

              String helper = "";

              for(int i = 0; i < data.length(); i++) {
                helper = helper + data.charAt(i);

                if(data.charAt(i) == ',' || data.charAt(i) == '-') {
                  range.add(Integer.valueOf(helper.substring(0, helper.length() - 1))) ;
                  helper = "";
                }

                if(i+1 == data.length()) {
                  range.add(Integer.valueOf(helper)) ;
                }                
              }
              if(main.partOne(range)) {
                answer1++;
              };
              if(main.partTwo(range)) {
                answer2++;
              };       
            }

            myReader.close();

          } catch (Exception e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
          }
      System.out.println("Answer Part 1: "+ answer1);
      System.out.println("Answer Part 2: "+ answer2);
    }

    private boolean partOne(ArrayList<Integer> rangeList) {
      return(rangeList.get(0) <= rangeList.get(2) && rangeList.get(1) >= rangeList.get(3)) 
      || (rangeList.get(0) >= rangeList.get(2) && rangeList.get(1) <= rangeList.get(3));
    }

    private boolean partTwo(ArrayList<Integer> rangeList) {
      return (rangeList.get(0) >= rangeList.get(2) && rangeList.get(0) <= rangeList.get(3)) 
      || (rangeList.get(1) >= rangeList.get(2) && rangeList.get(1) <= rangeList.get(3)) 
      || (rangeList.get(2) >= rangeList.get(0) && rangeList.get(2) <= rangeList.get(1))
      || (rangeList.get(3) >= rangeList.get(0) && rangeList.get(3) <= rangeList.get(1));
    }
}

