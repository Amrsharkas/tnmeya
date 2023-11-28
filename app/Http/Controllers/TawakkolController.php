<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Entry;
use App\Answer;
class TawakkolController extends Controller
{
    public function home(){
        // $questions = Question::orderBy('stuff_order','asc')->get();
        $questions = [
            "أتحمل المسئوليات الموكلة إلي بارتياح.",
            "أخطط لمستقبلي بكل ثقة.",
            " أفضل أن يقوم الآخرون بمهامي.",
            "أنجز المهام المناطة بي على ما يرام.",
            " أتهرب من الاعتماد على نفسي.",
            "أتخذ قراراتي بنفسي.",
            "أرغب في الحصول على ما أريد دون بذل أي جهد.",
            "أستطيع اتخاذ القرار في المواقف الحياتية المختلفة.",
            "أثابر لتحقيق ما أحدد من أهداف.",
            "أتردد في اتخاذ القرارات الهامة.",
            "أقوم بتبديل الشيء الذي أشتريه مرات عدة.",
            "أستطيع اجتياز ما يعترضني من عقبات.",
            "لقد قمت بالتحويل من مساري الدراسي  أو المهني أكثر من مرة.",
            " أفتقد الإرادة في تحقيق ما أريد.",
            "يصيبني الارتباك عندما أقابل الغرباء لأول مرة.",
            "أشارك في الفعاليات الاجتماعية المختلفة.",
            "أجد حرجًا من مبادرة الآخرين بالسلام.",
            "أعتذر لمن أخطأت في حقه حتى لو كان أمام الآخرين",
            "أهرب من المواقف التي تتطلب المواجهة.",
            "أشعر بالخجل عند مواجهة أناس جدد.",
            "أخشى التحدث أمام الجمهور.",
            "أكتسب صداقات جديدة بسرعة.",
            "أشعر باحترام أهلي وتقديرهم لي.",
            "أشعر بالرضا عن مستواي الأكاديمي والمهني.",
            "أفتقر إلى قدرات هامة لتحقيق التفوق الأكاديمي والمهني.",
            "أشعر بالقدرة على منافسة الزملاء.",
            "أشارك في أنشطة أكاديمية تتطلب الإبداع.",
            "أحصل على درجات دون المستوى الذي توقعته في نهاية الفصل الدراسي.",
            "أشعر بالاستياء من تخصصي المهني والأكاديمي.",
            "أشعر بالخجل من مظهري.",
            "أخرج من المنزل وأنا في كامل الأناقة والترتيب.",
            "أشعر بعدم الرضا عن مظهري الخارجي.",
            "أحرص على أناقة مظهري بين الزملاء.",
            "من حسن حظي أنني جميل إلى هذا الحد.",
            "أحسن الظن بالله ـ عز وجل ـ.",
            "أتردد في اتخاذ القرار حتى بعد اقتناعي به.",
            "اقدم على المهام دون استعداد مسبق على أمل أن يوفقني الله.",
            "أصبر على ما يصيبني من أذى.",
            "أبذل كل ما في وسعي مع اعتمادي على الله.",
            "يمكنني الوثوق بالناس. ",
            " سيحاول الناس الاستفادة مني (استغلالي) إذا أتيحت لهم الفرصة. ",
            "لا يمكنني أن أكون حذراً للغاية في التعامل مع الناس. ",
            "معظم الناس جديرون بالثقة.",
            "سوف يستجيب معظم الناس بالمثل عندما يثق بهم الآخرون.",
            "أشك في أن صديقي سيكون بجانبي عندما احتاجه",
        ];
        $negatives = [
            44,40,36,31,29,28,27,24,20,19,18,16,14,13,12,10,9,6,4,2
        ];
        foreach($questions as $key=> $question_text){
            $question = new Question();
            $question->question = $question_text;
            $question->admin_show = 1;
            $question->stuff_order = $key+1;
            if(in_array($key, $negatives)){
                $question->is_negative =1;
            }
            $question->save();

        }
        dd("done");
        $negatives = [
            44,40,36,31,29,28,27,24,20,19,18,16,14,13,12,10,9,6,4,2
        ];
        return view('home2',compact("questions","negatives"));
    }
    public function result(Request $req){
        $entry = new Entry();
        $entry->email = $req->input()['email'];
        $entry->name = $req->input()['name'];
        $entry->phone = $req->input()['phone'];
        $entry->save();
        $results = [
            "1" => [
                "مستوى عالي في الثقة بالنفس: وتتمتع بدرجة عالية من تقدير الذات. "
            ],
            "2" => [
                "مستوى متوسط في الثقة بالنفس: ويمكنك تحسين ثقتك بنفسك من خلال الاشتراك في الأعمال التطوعية التي تسهم في اكتشاف مهاراتك وقدراتك، بما يحسن ثقتك بنفسك، وبالآخرين، "
            ],
            "3" => [
                "قدرة منخفضة في الثقة بالنفس: يجب عليك الانخراط في دورات وورش تهدف لتنمية الثقة بالنفس، كما يمكنك من تحسين ثقتك بنفسك من خلال الحرص على عباداتك التي تزيد من ثقتك بالله تعالى وحسن التوكل عليه.",
            ],
            "4" => [
                "قدرة متدنية في الثقة بالنفس: نوصيك باستشارة اختصاصي نفسي، مختص بتنمية وتطوير ثقة الأفراد بأنفسهم."
            ]
        ];
        
        $total = 0;
        $i = 1;
        $weak_points = [];
        foreach($req->input() as $key => $input){
            
            if(
                $key == "_token"
                ||
                $key == "email"
                ||
                $key == "name"
                ||
                $key == "phone"
            ){
                continue;
            }
            $answer = new Answer();
            $answer->entry_id = $entry->id;
            $answer->question_id = $i;
            $answer->answer = $input;
            $answer->save();
            $total = $total + $input;
            if($input ==1 ){
                $weak_points[] = Question::find($i);
            }
            $i++;
          
        }



        
        if($total < 34){
            $result = $results[4][0]; 
        }
        if($total >= 34 && $total <= 68){
            $result = $results[3][0]; 
        }
        if($total > 68 && $total <= 103){
            $result = $results[2][0]; 
        }

        if($total > 103){
            $result = $results[1][0]; 
        }





        
        return view('result2',compact('result',"weak_points","total"));
    }
}
