window.wikiData = {
  "sources": [
    {
      "lecture": 1,
      "pages": 8,
      "sha256": "38f3462a933ad90b7d191e4e036dc57cc11ddb069c4f9ce1f87167c615c3117d"
    },
    {
      "lecture": 2,
      "pages": 14,
      "sha256": "065ab5cd15a758628b74f0efcf2baf19df92087eaefc648e476227fd70f1c5ce"
    },
    {
      "lecture": 3,
      "pages": 28,
      "sha256": "3b2dc05c9d326bdf4d0ba09a65364bb3975292bf8c7808858663a50b5672d389"
    },
    {
      "lecture": 4,
      "pages": 22,
      "sha256": "2386e777ee1cc5569d9385204980984b58253a07babe3d5a32f57a0a5f457a92"
    },
    {
      "lecture": 5,
      "pages": 14,
      "sha256": "837b9823ba34dc6c59d9552fcc37c47e9345e53aafe7311669bf6bdb96bed609"
    },
    {
      "lecture": 6,
      "pages": 14,
      "sha256": "abf1c296d15d3edc95370ccf53512ebc6af2cb015e1486e2d7ee17b4d4dc692a"
    }
  ],
  "entries": [
    {
      "id": "mc",
      "lecture": 1,
      "start": 4,
      "end": 8,
      "title": "蒙地卡羅模擬",
      "keywords": "Monte Carlo 抽樣 大數法則 隨機模擬",
      "answer": "重複抽取隨機情境，每次記錄成本、利潤或事件是否發生。用樣本平均估計期望值，用發生次數除以總次數估計機率。公平硬幣可用理論機率 0.5 當作比對基準。",
      "formula": "估計機率 = 命中次數 / 模擬次數"
    },
    {
      "id": "tree",
      "lecture": 2,
      "start": 2,
      "end": 7,
      "title": "決策樹與期望金額",
      "keywords": "decision tree EMV 期望值 倒推 敏感度",
      "answer": "決策節點代表可選方案，機率節點代表不可控制的結果。由末端往回算，機率節點取加權平均，決策節點在最大化期望金額時取最大值。調整分支機率可檢查方案是否翻轉。",
      "formula": "EMV = Σ 機率 × 金額"
    },
    {
      "id": "risk",
      "lecture": 2,
      "start": 7,
      "end": 8,
      "title": "期望值與風險",
      "keywords": "risk departure 波動 確定收益",
      "answer": "兩個方案可以有不同的虧損機率，即使其中一個期望金額較高。評估時可同時比較期望收益、下檔結果與決策者承受波動的能力。",
      "formula": ""
    },
    {
      "id": "empirical",
      "lecture": 2,
      "start": 9,
      "end": 14,
      "title": "經驗分配與回測",
      "keywords": "empirical distribution history 歷史資料 需求 運輸",
      "answer": "等權重歷史觀測可以用出現頻率形成分配。運輸案例比較固定平均、逐月預測、經驗情境模擬三種策略，並用後續月份回測。成本有非線性時，平均需求的成本和平均成本可能不同。",
      "formula": ""
    },
    {
      "id": "bayes",
      "lecture": 3,
      "start": 2,
      "end": 8,
      "title": "條件機率與貝氏更新",
      "keywords": "bayes posterior prior 聯合 後驗",
      "answer": "講義的市場案例先給強市機率 0.3，再給強市下負面訊號機率 0.2 與弱市下正面訊號機率 0.1。正面訊號出現後，強市機率為 0.24/(0.24+0.07)，約 77.42%。",
      "formula": "P(A｜B) = P(B｜A)P(A) / P(B)"
    },
    {
      "id": "discrete",
      "lecture": 3,
      "start": 11,
      "end": 12,
      "title": "離散機率與二項分配",
      "keywords": "binomial bernoulli PMF CDF 次數 服務水準",
      "answer": "PMF 回答恰好幾次，CDF 回答最多幾次。若 n 次試驗獨立且成功率同為 p，成功總數服從二項分配。用 CDF 可找達到目標服務水準的最小容量。",
      "formula": "P(X=k) = C(n,k)p^k(1−p)^(n−k)"
    },
    {
      "id": "counts",
      "lecture": 3,
      "start": 24,
      "end": 26,
      "title": "計數模型",
      "keywords": "Poisson geometric negative binomial 卜瓦松 負二項 幾何",
      "answer": "Poisson 是計數模型，平均與變異數均為 λ。負二項可描述變異數比平均大很多的計數。幾何分配可描述獨立、同成功率試驗中，等到首次成功所需的試驗次數。",
      "formula": ""
    },
    {
      "id": "cdf",
      "lecture": 4,
      "start": 2,
      "end": 8,
      "title": "連續密度、累積機率與分位數",
      "keywords": "PDF CDF uniform normal 常態 均勻 分位數",
      "answer": "連續分配的區間機率是密度曲線下的面積。CDF 計算不超過門檻的機率。分位數反過來由機率找門檻，常態模型的 μ 是平均，σ 是標準差。",
      "formula": "P(a ≤ X ≤ b) = F(b) − F(a)"
    },
    {
      "id": "corr",
      "lecture": 4,
      "start": 10,
      "end": 13,
      "title": "共變異、相關與相依性",
      "keywords": "covariance correlation MVN 獨立 標準差",
      "answer": "相關係數把共變異除以兩個標準差。在兩個標準差為正時，值介於 −1 和 1。合計兩段有相依性的處理時間時，總變異要加上兩倍共變異。",
      "formula": "Corr(X,Y) = Cov(X,Y)/(σₓσᵧ)；Var(X+Y) = Var(X)+Var(Y)+2Cov(X,Y)"
    },
    {
      "id": "hedge",
      "lecture": 4,
      "start": 14,
      "end": 22,
      "title": "匯率情境與避險",
      "keywords": "hedge put 賣權 匯損",
      "answer": "講義對比購買不同數量賣權時的收入結果。持有一單位賣權的淨收益，等於匯率低於履約價時的差額減權利金，匯率高於履約價時只損失權利金。",
      "formula": "淨收益 = max(履約價 − 到期匯率, 0) − 權利金"
    },
    {
      "id": "shortfall",
      "lecture": 5,
      "start": 2,
      "end": 5,
      "title": "漁船收益與尾部風險",
      "keywords": "Conley fisheries CVaR expected shortfall",
      "answer": "漁船案例用隨機售價比較不同港口的收益。可同時看虧損機率和最差 5% 情境的平均收益，理解下檔損失有多嚴重。",
      "formula": ""
    },
    {
      "id": "expo",
      "lecture": 5,
      "start": 6,
      "end": 7,
      "title": "指數分配與等待時間",
      "keywords": "exponential rate scale 無記憶",
      "answer": "速率 λ 表示每單位時間的事件率，平均等待為 1/λ。在指數模型下，已等待多久不影響往後還要等多久的分配。模型是否適用需檢查流程特性。",
      "formula": "P(X > t) = exp(−λt)"
    },
    {
      "id": "gamma",
      "lecture": 5,
      "start": 8,
      "end": 10,
      "title": "Gamma 分配與任務工期",
      "keywords": "gamma shape scale 工期 專案 等待",
      "answer": "形狀 a、尺度 θ 都大於零。k 個互相獨立、同速率 λ 的指數等待時間相加，服從形狀 k、尺度 1/λ 的 Gamma。專案若有平行活動，要依先後關係算完工日，再評估逾期。",
      "formula": "E[X] = aθ；Var(X) = aθ²"
    },
    {
      "id": "nv",
      "lecture": 6,
      "start": 2,
      "end": 4,
      "title": "報童模型與臨界比例",
      "keywords": "newsvendor 進貨 缺貨 殘值 服務水準 optimal",
      "answer": "單期訂量 Q 在看到需求前就決定。售價 p 大於成本 c，且 c 大於殘值 s 時，少訂成本 Cu=p−c，多訂成本 Co=c−s。離散需求可取 CDF 首次達到臨界比例的訂量。實際服務水準 P(D≤Q) 可能高於臨界比例。",
      "formula": "CR = Cu/(Cu+Co)；Q* = min{q : F(q) ≥ CR}"
    },
    {
      "id": "myerson",
      "lecture": 6,
      "start": 5,
      "end": 8,
      "title": "分位數建模與單期庫存",
      "keywords": "myerson snowboards 滑雪板 專家 分位數",
      "answer": "滑雪板有生產前置期。講義以專家提供的下界、上界與代表性分位數建立需求情境，再對照期望利潤。可用於反覆發生的單期決策，也可用於一次性決策。",
      "formula": ""
    },
    {
      "id": "selling",
      "lecture": 6,
      "start": 9,
      "end": 13,
      "title": "售價、超賣與最佳化",
      "keywords": "selling starlux price overbooking 價格 超賣",
      "answer": "航空教學案例用票價解釋需求，另納入未到場、退款和超賣補償。若售價也是決策變數，就要一起比較價格與銷售數量。",
      "formula": ""
    },
    {
      "id": "simopt",
      "lecture": 6,
      "start": 13,
      "end": 14,
      "title": "模擬最佳化與模型限制",
      "keywords": "simulation optimization 候選方案 信賴區間",
      "answer": "模擬負責評估指定方案的結果。先找出會影響收益的隨機因素，再對候選方案計算績效，最後按準則挑選。模擬誤差可用更多試驗與信賴區間衡量，分配假設仍須另行檢查。",
      "formula": ""
    }
  ]
};
