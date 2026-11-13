"use strict";

/* Line-aligned starter map: refine one-unit lines into meaning units. */
const META = {
	title: "すきなことだけでいいです — LinguaMap",
	subtitle: "Parallel word map: 日本語 · Romaji · English · Русский",
	credit: "Generated from line-aligned expected translations by tools/song.py. One unit per source line; colours and POS are placeholders until word-level segmentation. Repeated refrains share names, so surface-variant warnings are intentional.",
	columns: ["ru", "en", "jp", "tr"],
	columnTitles: { ru: "Русский", en: "English", jp: "日本語", tr: "Romaji" },
	trMirror: true,
	posLabels: { n: "line (starter map)" },
	posOrder: ["n"]
};

const DATA = [
	{ type: "section", label: "Stanza 1" },
	{ type: "line", src: "平日は嫌　休みが好き", units: [
		{ name: "line_i_don_t_like_605988ad", pos: "n", jp: "平日は嫌　休みが好き", tr: "heijitsu wa iya yasumi ga suki", en: "I don’t like weekdays, I like the weekend", ru: "Будни мне не нравятся, зато выходные — да" }
	] },
	{ type: "line", src: "仕事は嫌　二度寝が好き", units: [
		{ name: "line_i_don_t_like_78e65907", pos: "n", jp: "仕事は嫌　二度寝が好き", tr: "shigoto wa iya nidone ga suki", en: "I don’t like work, I like going back to sleep", ru: "Работа мне не нравится, зато люблю снова уснуть" }
	] },
	{ type: "line", src: "怠けたまま暮らすの無理", units: [
		{ name: "line_it_s_impossible_to_3fe83d7c", pos: "n", jp: "怠けたまま暮らすの無理", tr: "namaketa mama kurasu no muri", en: "It’s impossible to live on slacking like this", ru: "Жить всё время в лени не выйдет" }
	] },
	{ type: "line", src: "遠のいていく意識", units: [
		{ name: "line_my_consciousness_recedes_77f6efe2", pos: "n", jp: "遠のいていく意識", tr: "toonoite iku ishiki", en: "My consciousness recedes", ru: "Сознание уплывает всё дальше" }
	] },
	{ type: "gap" },
	{ type: "section", label: "Stanza 2" },
	{ type: "line", src: "野菜は嫌　ハンバーグが好き", units: [
		{ name: "line_i_don_t_like_4db0090b", pos: "n", jp: "野菜は嫌　ハンバーグが好き", tr: "yasai wa iya hanbaagu ga suki", en: "I don’t like vegetables, I like hamburgers", ru: "Овощи не люблю, зато гамбургеры обожаю" }
	] },
	{ type: "line", src: "麦茶は嫌　ジュースが好き", units: [
		{ name: "line_i_don_t_like_826b90a3", pos: "n", jp: "麦茶は嫌　ジュースが好き", tr: "mugicha wa iya juusu ga suki", en: "I don’t like barley tea, I like juice", ru: "Ячменный чай не люблю, зато сок — да" }
	] },
	{ type: "line", src: "甘えんな　でも甘味は好き", units: [
		{ name: "line_don_t_be_sweet_c06bf454", pos: "n", jp: "甘えんな　でも甘味は好き", tr: "amaenna demo kanmi wa suki", en: "Don’t be sweet on me, but I like sweet tasting things", ru: "Не будь приторным, но сладкое я люблю" }
	] },
	{ type: "line", src: "生前の１ページ", units: [
		{ name: "line_my_lifetime_s_first_a5f4c397", pos: "n", jp: "生前の１ページ", tr: "seizen no ichi-peeji", en: "My lifetime’s first page", ru: "Первая страница моей жизни" }
	] },
	{ type: "gap" },
	{ type: "section", label: "Stanza 3" },
	{ type: "line", src: "好きなことだけ見つめて", units: [
		{ name: "line_only_looking_at_things_b79134df", pos: "n", jp: "好きなことだけ見つめて", tr: "suki na koto dake mitsumete", en: "Only looking at things I like", ru: "Смотрю лишь на то, что люблю" }
	] },
	{ type: "line", src: "だんだん　視力が弱くなる", units: [
		{ name: "line_gradually_my_eyesight_gets_6f78d419", pos: "n", jp: "だんだん　視力が弱くなる", tr: "dandan shiryoku ga yowaku naru", en: "gradually my eyesight gets worse", ru: "И постепенно зрение слабеет" }
	] },
	{ type: "line", src: "好きなことで満たされて", units: [
		{ name: "line_only_being_filled_with_0de26b98", pos: "n", jp: "好きなことで満たされて", tr: "suki na koto de mitasarete", en: "Only being filled with things I like", ru: "Наполняясь лишь тем, что люблю" }
	] },
	{ type: "line", src: "だんだん　頭が悪くなる", units: [
		{ name: "line_gradually_my_mind_gets_d579c05e", pos: "n", jp: "だんだん　頭が悪くなる", tr: "dandan atama ga waruku naru", en: "gradually my mind gets duller", ru: "И постепенно глупею" }
	] },
	{ type: "gap" },
	{ type: "section", label: "Stanza 4" },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "みんな　好きなことが好きなんです", units: [
		{ name: "line_everyone_likes_the_things_901d5b0e", pos: "n", jp: "みんな　好きなことが好きなんです", tr: "minna suki na koto ga suki na ndesu", en: "Everyone likes the things they like", ru: "Все любят то, что любят" }
	] },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "みんな　嫌なことは嫌なんです", units: [
		{ name: "line_everyone_dislikes_the_things_047992cb", pos: "n", jp: "みんな　嫌なことは嫌なんです", tr: "minna iya na koto wa iya na ndesu", en: "Everyone dislikes the things they dislike", ru: "Всем не нравится то, что не нравится" }
	] },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "ほんと　すきなことだけでいいです", units: [
		{ name: "line_really_all_i_need_c3a476e8", pos: "n", jp: "ほんと　すきなことだけでいいです", tr: "honto suki na koto dake de ii desu", en: "Really, All I need are the things I like", ru: "Правда, мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "全人類が好きなことやったら", units: [
		{ name: "line_although_if_all_of_e13ffd20", pos: "n", jp: "全人類が好きなことやったら", tr: "zenjinrui ga suki na koto yattara", en: "Although, if all of humanity just did the things they like,", ru: "Если бы все люди делали лишь то, что любят," }
	] },
	{ type: "line", src: "世界は滅亡するけど", units: [
		{ name: "line_the_world_would_turn_02d9097a", pos: "n", jp: "世界は滅亡するけど", tr: "sekai wa metsubou suru kedo", en: "the world would turn to ruin", ru: "мир бы погиб — и всё же" }
	] },
	{ type: "gap" },
	{ type: "section", label: "Stanza 5" },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "君のことが　ほんとに好きなんです", units: [
		{ name: "line_i_really_like_you_2cbe823c", pos: "n", jp: "君のことが　ほんとに好きなんです", tr: "kimi no koto ga honto ni suki na ndesu", en: "I really like you", ru: "А тебя я правда люблю" }
	] },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "君は違う誰かが好きなんです", units: [
		{ name: "line_you_like_someone_else_afa5df6f", pos: "n", jp: "君は違う誰かが好きなんです", tr: "kimi wa chigau dareka ga suki na ndesu", en: "You like someone else", ru: "Но ты любишь кого-то другого" }
	] },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "やっぱ　それだけじゃ難しいです", units: [
		{ name: "line_after_all_i_guess_7e4ec405", pos: "n", jp: "やっぱ　それだけじゃ難しいです", tr: "yappa sore dake ja muzukashii desu", en: "After all, I guess it would be pretty difficult to have only that", ru: "Всё же, наверное, только этим не обойтись" }
	] },
	{ type: "line", src: "全人類が幸せになったら", units: [
		{ name: "line_because_if_all_of_422d34be", pos: "n", jp: "全人類が幸せになったら", tr: "zenjinrui ga shiawase ni nattara", en: "because If all of humanity was happy,", ru: "Ведь если бы все люди стали счастливы," }
	] },
	{ type: "line", src: "宇宙が迷惑するから", units: [
		{ name: "line_the_rest_of_the_03ac3244", pos: "n", jp: "宇宙が迷惑するから", tr: "uchuu ga meiwaku suru kara", en: "the rest of the universe would be troubled", ru: "остальной вселенной пришлось бы туго" }
	] },
	{ type: "gap" },
	{ type: "section", label: "Stanza 6" },
	{ type: "line", src: "天使は嫌　悪魔が好き", units: [
		{ name: "line_i_don_t_like_d0e8cf86", pos: "n", jp: "天使は嫌　悪魔が好き", tr: "tenshi wa iya akuma ga suki", en: "I don’t like angels, I like demons", ru: "Ангелов не люблю, зато демонов — да" }
	] },
	{ type: "line", src: "天国は嫌　地獄が好き", units: [
		{ name: "line_i_don_t_like_2828d6d9", pos: "n", jp: "天国は嫌　地獄が好き", tr: "tengoku wa iya jigoku ga suki", en: "I don’t like heaven, I like hell", ru: "Рай не люблю, зато ад — да" }
	] },
	{ type: "line", src: "あべこべだった　君の趣味", units: [
		{ name: "line_your_tastes_were_always_dd0f53af", pos: "n", jp: "あべこべだった　君の趣味", tr: "abekobe datta kimi no shumi", en: "Your tastes were always the opposite", ru: "Твои вкусы были всему наперекор" }
	] },
	{ type: "line", src: "人それぞれのクレイジー", units: [
		{ name: "line_people_are_all_crazy_9c4bb1d7", pos: "n", jp: "人それぞれのクレイジー", tr: "hito sorezore no kureijii", en: "People are all crazy in their own ways", ru: "У каждого своё безумие" }
	] },
	{ type: "gap" },
	{ type: "section", label: "Stanza 7" },
	{ type: "line", src: "生物は嫌　機械が好き", units: [
		{ name: "line_i_don_t_like_a638cb23", pos: "n", jp: "生物は嫌　機械が好き", tr: "seibutsu wa iya kikai ga suki", en: "I don’t like living things, I like machines", ru: "Живое не люблю, зато машины — да" }
	] },
	{ type: "line", src: "リアルは嫌　虚像が好き", units: [
		{ name: "line_i_don_t_like_81675726", pos: "n", jp: "リアルは嫌　虚像が好き", tr: "riaru wa iya kyozou ga suki", en: "I don’t like the real world, I like the virtual", ru: "Реальность не люблю, зато вымысел — да" }
	] },
	{ type: "line", src: "偏っていた　君の趣味", units: [
		{ name: "line_your_tastes_were_always_dc634246", pos: "n", jp: "偏っていた　君の趣味", tr: "katayotte ita kimi no shumi", en: "Your tastes were always biased", ru: "Твои вкусы были однобоки" }
	] },
	{ type: "line", src: "悪化して思考停止", units: [
		{ name: "line_deteriorating_and_ceasing_to_8a8003ed", pos: "n", jp: "悪化して思考停止", tr: "akka shite shikouteishi", en: "deteriorating and ceasing to think", ru: "Всё ухудшалось, разум замер" }
	] },
	{ type: "gap" },
	{ type: "section", label: "Stanza 8" },
	{ type: "line", src: "好きなことに囲まれて", units: [
		{ name: "line_surrounded_by_the_things_922534b6", pos: "n", jp: "好きなことに囲まれて", tr: "suki na koto ni kakomarete", en: "Surrounded by the things I like", ru: "Окружён лишь тем, что люблю," }
	] },
	{ type: "line", src: "嫌なことが許せなくなる", units: [
		{ name: "line_i_ve_become_unforgiving_cd425de9", pos: "n", jp: "嫌なことが許せなくなる", tr: "iya na koto ga yurusenaku naru", en: "I’ve become unforgiving to the things I don’t like", ru: "и уже не могу терпеть то, что не люблю" }
	] },
	{ type: "line", src: "好きなことだけで生きて", units: [
		{ name: "line_living_only_with_the_48f2c40b", pos: "n", jp: "好きなことだけで生きて", tr: "suki na koto dake de ikite", en: "Living only with the things I like", ru: "Живу лишь тем, что люблю," }
	] },
	{ type: "line", src: "どこかの誰かに恨まれる", units: [
		{ name: "line_i_m_resented_by_b8fda9cb", pos: "n", jp: "どこかの誰かに恨まれる", tr: "dokoka no dareka ni uramareru", en: "I'm resented by someone, somewhere", ru: "и кто-то где-то держит на меня обиду" }
	] },
	{ type: "gap" },
	{ type: "section", label: "Stanza 9" },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "みんな　好きなことが好きなんです", units: [
		{ name: "line_everyone_likes_the_things_901d5b0e", pos: "n", jp: "みんな　好きなことが好きなんです", tr: "minna suki na koto ga suki na ndesu", en: "Everyone likes the things they like", ru: "Все любят то, что любят" }
	] },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "みんな　嫌なことは嫌なんです", units: [
		{ name: "line_everyone_dislikes_the_things_047992cb", pos: "n", jp: "みんな　嫌なことは嫌なんです", tr: "minna iya na koto wa iya na ndesu", en: "Everyone dislikes the things they dislike", ru: "Всем не нравится то, что не нравится" }
	] },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "ほんと　すきなことだけでいいです", units: [
		{ name: "line_really_all_i_need_c3a476e8", pos: "n", jp: "ほんと　すきなことだけでいいです", tr: "honto suki na koto dake de ii desu", en: "Really, All I need are the things I like", ru: "Правда, мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "全人類が好きなことやったら", units: [
		{ name: "line_although_if_all_of_e13ffd20", pos: "n", jp: "全人類が好きなことやったら", tr: "zenjinrui ga suki na koto yattara", en: "Although, if all of humanity just did the things they like,", ru: "Если бы все люди делали лишь то, что любят," }
	] },
	{ type: "line", src: "世界は滅亡するけど", units: [
		{ name: "line_the_world_would_turn_02d9097a", pos: "n", jp: "世界は滅亡するけど", tr: "sekai wa metsubou suru kedo", en: "the world would turn to ruin", ru: "мир бы погиб — и всё же" }
	] },
	{ type: "gap" },
	{ type: "section", label: "Stanza 10" },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "ずっと　仲間と笑っていたいんです", units: [
		{ name: "line_i_just_want_to_e8784b91", pos: "n", jp: "ずっと　仲間と笑っていたいんです", tr: "zutto nakama to waratte itai ndesu", en: "I just want to smile with my friends all the time", ru: "Мне хочется всё время смеяться с друзьями" }
	] },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "だけど　仲間が全然いないんです", units: [
		{ name: "line_although_i_have_no_1c5cde8f", pos: "n", jp: "だけど　仲間が全然いないんです", tr: "dakedo nakama ga zenzen inai ndesu", en: "Although I have no friends to do that with", ru: "Но друзей у меня совсем нет" }
	] },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "やっぱ　それだけじゃ難しいです", units: [
		{ name: "line_after_all_i_guess_7e4ec405", pos: "n", jp: "やっぱ　それだけじゃ難しいです", tr: "yappa sore dake ja muzukashii desu", en: "After all, I guess it would be pretty difficult to have only that", ru: "Всё же, наверное, только этим не обойтись" }
	] },
	{ type: "line", src: "全人類の願いが叶ったら", units: [
		{ name: "line_because_if_all_of_ad9ced09", pos: "n", jp: "全人類の願いが叶ったら", tr: "zenjinrui no negai ga kanattara", en: "because if all of humanity's wishes were granted,", ru: "Ведь если бы исполнились желания всех людей," }
	] },
	{ type: "line", src: "地球が爆発するから", units: [
		{ name: "line_the_world_would_explode_9ddd199b", pos: "n", jp: "地球が爆発するから", tr: "chikyuu ga bakuhatsu suru kara", en: "the world would explode", ru: "Земля бы взорвалась" }
	] },
	{ type: "gap" },
	{ type: "section", label: "Stanza 11" },
	{ type: "line", src: "待ち合わせの約束があった", units: [
		{ name: "line_i_had_promised_to_d320751a", pos: "n", jp: "待ち合わせの約束があった", tr: "machiawase no yakusoku ga atta", en: "I had promised to meet someone", ru: "Я обещал встретиться с кем-то" }
	] },
	{ type: "line", src: "雨が嫌だから　行かなかった", units: [
		{ name: "line_but_because_i_don_734b54a9", pos: "n", jp: "雨が嫌だから　行かなかった", tr: "ame ga iya dakara ikanakatta", en: "but because I don’t like the rain, I didn’t go", ru: "Но не люблю дождь — и не пошёл" }
	] },
	{ type: "line", src: "出かけてたら　良いことあったかな", units: [
		{ name: "line_i_wonder_if_something_e856e2a9", pos: "n", jp: "出かけてたら　良いことあったかな", tr: "dekaketetara ii koto atta kana", en: "I wonder if something good would have happened if I went", ru: "Если бы вышел, может, случилось бы что-то хорошее?" }
	] },
	{ type: "line", src: "今際の際の走馬灯", units: [
		{ name: "line_my_life_flashes_before_3a658ae4", pos: "n", jp: "今際の際の走馬灯", tr: "imawanokiwa no soumatou", en: "My life flashes before my eyes in my last moments", ru: "В последний миг вся жизнь перед глазами" }
	] },
	{ type: "gap" },
	{ type: "section", label: "Stanza 12" },
	{ type: "line", src: "好きなことだけでいいです…", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "好きなことだけでいいです…", tr: "suki na koto dake de ii desu …", en: "All I need are the things I like...", ru: "Мне хватит только того, что люблю…" }
	] },
	{ type: "line", src: "全人類が好きなことやったら", units: [
		{ name: "line_although_if_all_of_e13ffd20", pos: "n", jp: "全人類が好きなことやったら", tr: "zenjinrui ga suki na koto yattara", en: "Although, if all of humanity just did the things they like,", ru: "Если бы все люди делали лишь то, что любят," }
	] },
	{ type: "line", src: "世界は滅亡するけど", units: [
		{ name: "line_the_world_would_turn_02d9097a", pos: "n", jp: "世界は滅亡するけど", tr: "sekai wa metsubou suru kedo", en: "the world would turn to ruin", ru: "мир бы погиб — и всё же" }
	] },
	{ type: "gap" },
	{ type: "section", label: "Stanza 13" },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "みんな　好きなことが好きでした", units: [
		{ name: "line_everyone_just_liked_the_db140c5a", pos: "n", jp: "みんな　好きなことが好きでした", tr: "minna suki na koto ga suki deshita", en: "Everyone just liked the things they liked", ru: "Все любили то, что любили" }
	] },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "みんな　嫌なことは嫌でした", units: [
		{ name: "line_everyone_disliked_the_things_24aa3722", pos: "n", jp: "みんな　嫌なことは嫌でした", tr: "minna iya na koto wa iya deshita", en: "Everyone disliked the things they disliked", ru: "Всем не нравилось то, что не нравилось" }
	] },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "ほんと　すきなことだけでいいです", units: [
		{ name: "line_really_all_i_need_c3a476e8", pos: "n", jp: "ほんと　すきなことだけでいいです", tr: "honto suki na koto dake de ii desu", en: "Really, all I need are the things I like", ru: "Правда, мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "全人類が好きなことやったら", units: [
		{ name: "line_although_if_all_of_e13ffd20", pos: "n", jp: "全人類が好きなことやったら", tr: "zenjinrui ga suki na koto yattara", en: "Although, when all of humanity just did the things they liked,", ru: "Если бы все люди делали лишь то, что любят," }
	] },
	{ type: "line", src: "世界は滅亡したけど", units: [
		{ name: "line_the_world_turned_to_771b473a", pos: "n", jp: "世界は滅亡したけど", tr: "sekai wa metsubou shita kedo", en: "the world turned to ruin", ru: "мир погиб — и всё же" }
	] },
	{ type: "gap" },
	{ type: "section", label: "Stanza 14" },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "君のことが　ほんとに好きでした", units: [
		{ name: "line_i_really_liked_you_ac1a16c4", pos: "n", jp: "君のことが　ほんとに好きでした", tr: "kimi no koto ga honto ni suki deshita", en: "I really liked you", ru: "А тебя я правда любил" }
	] },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "君は違う誰かが好きでした", units: [
		{ name: "line_you_liked_someone_else_2be834ea", pos: "n", jp: "君は違う誰かが好きでした", tr: "kimi wa chigau dareka ga suki deshita", en: "You liked someone else", ru: "Но сердце твоё было с другим" }
	] },
	{ type: "line", src: "すきなことだけでいいです", units: [
		{ name: "line_all_i_need_are_8bdfabd0", pos: "n", jp: "すきなことだけでいいです", tr: "suki na koto dake de ii desu", en: "All I need are the things I like", ru: "Мне хватит только того, что люблю" }
	] },
	{ type: "line", src: "やっぱ　それだけじゃ難しいです", units: [
		{ name: "line_after_all_i_guess_7e4ec405", pos: "n", jp: "やっぱ　それだけじゃ難しいです", tr: "yappa sore dake ja muzukashii desu", en: "After all I guess, it would be pretty difficult to have only that", ru: "Всё же, наверное, только этим не обойтись" }
	] },
	{ type: "line", src: "全人類が幸せになったら", units: [
		{ name: "line_because_if_all_of_422d34be", pos: "n", jp: "全人類が幸せになったら", tr: "zenjinrui ga shiawase ni nattara", en: "because If all of humanity was happy,", ru: "Ведь если бы все люди стали счастливы," }
	] },
	{ type: "line", src: "宇宙が迷惑するから", units: [
		{ name: "line_the_rest_of_the_03ac3244", pos: "n", jp: "宇宙が迷惑するから", tr: "uchuu ga meiwaku suru kara", en: "the rest of the universe would be troubled", ru: "остальной вселенной пришлось бы туго" }
	] }
];
