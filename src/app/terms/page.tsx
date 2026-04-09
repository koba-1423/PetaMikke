import Navbar from "@/components/Navbar";
import Link from "next/link";

const sections = [
  {
    title: "第1条（サービスの目的）",
    content: "PetaMikke（以下「本サービス」）は、シールの個人間売買・交換・情報共有を目的としたプラットフォームです。本サービスは場を提供するのみであり、取引の当事者はユーザー個人です。",
  },
  {
    title: "第2条（禁止事項）",
    content: null,
    list: [
      "偽物・コピー品・模倣品のシールの出品・販売・交換",
      "著作権・商標権その他の知的財産権を侵害するシールの取引",
      "未成年者への不適切な勧誘や取引",
      "虚偽の商品情報の記載",
      "他のユーザーへの嫌がらせ・誹謗中傷",
      "反社会的勢力との取引",
      "法令に違反する一切の行為",
    ],
  },
  {
    title: "第3条（免責事項）",
    content: "本サービスは個人間取引のプラットフォームを提供するものであり、取引内容・商品の品質・真贋・取引の成立について一切の保証を行いません。取引に関するトラブルは取引当事者間で解決するものとします。",
  },
  {
    title: "第4条（未成年者の利用）",
    content: "18歳未満のユーザーが本サービスを利用する場合は、保護者の同意が必要です。金銭を伴う取引については、保護者の管理のもとで行ってください。本サービスは未成年者保護の観点から、疑わしい取引を検知した場合はアカウントを停止することがあります。",
  },
  {
    title: "第5条（偽物・コピー品について）",
    content: "偽物または模倣品のシールの出品は厳禁です。発見次第、出品削除およびアカウント停止の措置を取ります。偽物と疑われる商品を発見した場合は、通報機能をご利用ください。商標権・著作権侵害が確認された場合は、法的措置を講じる場合があります。",
  },
  {
    title: "第6条（取引の責任）",
    content: "売買・交換取引の成立・履行・トラブルに関する責任は、取引当事者であるユーザー間にあります。本サービスは仲介手数料を受領しますが、これをもって取引の保証とはなりません。",
  },
  {
    title: "第7条（個人情報の取り扱い）",
    content: "本サービスはユーザーの個人情報を適切に管理し、サービス提供の目的以外に使用しません。詳細はプライバシーポリシーをご参照ください。",
  },
  {
    title: "第8条（利用規約の変更）",
    content: "本サービスは必要に応じて利用規約を変更することがあります。変更後も本サービスを利用した場合、変更後の利用規約に同意したものとみなします。",
  },
];

export default function TermsPage() {
  return (
    <div className="pb-16 md:pb-0">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">利用規約</h1>
        <p className="text-gray-400 text-sm mb-8">最終更新日：2026年4月9日</p>

        {/* 重要告知 */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-8">
          <p className="text-sm font-bold text-red-600 mb-1">重要：偽物シールの出品は厳禁です</p>
          <p className="text-xs text-red-500 leading-relaxed">
            コピー品・模倣品の出品・販売・交換は商標法・著作権法に違反する可能性があります。発見した場合は即時削除・アカウント停止・法的措置の対象となります。
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-bold text-gray-800 mb-3">{section.title}</h2>
              {section.content && (
                <p className="text-sm text-gray-600 leading-relaxed">{section.content}</p>
              )}
              {section.list && (
                <ul className="space-y-1.5">
                  {section.list.map((item, j) => (
                    <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-pink-500 text-sm font-medium hover:underline">
            トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
