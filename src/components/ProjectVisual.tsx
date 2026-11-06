import type { Project } from "@/data/projects";

function StudyArt() {
  return (
    <svg className="project-art" viewBox="0 0 720 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="720" height="360" fill="#e8d9bd" />
      <path d="M0 0h720v58H0z" fill="#f4eddf" />
      <text x="42" y="37" fill="#31544a" fontSize="11" fontWeight="700" letterSpacing="3">NO STRESS STUDY</text>
      <text x="678" y="37" textAnchor="end" fill="#8c7255" fontSize="10" letterSpacing="2">DIGITAL STUDY LIBRARY</text>
      <path d="M0 302c120-42 183-33 287 9s235 41 433-28v77H0z" fill="#d0b994" />
      <g transform="rotate(-8 181 205)">
        <rect x="83" y="98" width="168" height="199" rx="4" fill="#244a40" />
        <rect x="96" y="111" width="142" height="173" rx="2" fill="none" stroke="#96ae91" strokeOpacity=".55" />
        <circle cx="167" cy="163" r="27" fill="#d5a96a" />
        <path d="M143 163h48M167 139v48" stroke="#244a40" strokeWidth="2" />
        <text x="167" y="229" textAnchor="middle" fill="#f0e7d5" fontSize="14" fontFamily="Georgia,serif">STUDY</text>
        <text x="167" y="250" textAnchor="middle" fill="#b7c5ae" fontSize="8" letterSpacing="2">DIGITAL MATERIALS</text>
      </g>
      <g transform="rotate(3 359 196)">
        <rect x="265" y="85" width="187" height="216" rx="4" fill="#c6784e" />
        <rect x="279" y="99" width="159" height="188" rx="2" fill="none" stroke="#f2cda7" strokeOpacity=".75" />
        <path d="M298 151c32-39 78-39 111 0-33 37-79 37-111 0Z" fill="#e7bb86" />
        <path d="M306 151h95M354 111v80" stroke="#89543d" strokeWidth="1.5" />
        <text x="359" y="227" textAnchor="middle" fill="#fff1dd" fontSize="13" fontFamily="Georgia,serif">LEARNING MARKETPLACE</text>
        <text x="359" y="251" textAnchor="middle" fill="#f4d5b9" fontSize="8" letterSpacing="2">BROWSE · PURCHASE · ACCESS</text>
      </g>
      <g transform="rotate(9 540 205)">
        <rect x="478" y="110" width="139" height="184" rx="4" fill="#d4bd8c" />
        <rect x="491" y="123" width="113" height="158" rx="2" fill="#f1e5cd" />
        <path d="M507 153h80M507 164h66M507 175h74" stroke="#9b896b" strokeWidth="2" strokeLinecap="round" />
        <circle cx="548" cy="224" r="23" fill="#506f5a" />
        <path d="m537 224 8 8 15-17" fill="none" stroke="#edf0db" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="548" y="263" textAnchor="middle" fill="#655d49" fontSize="8" letterSpacing="1.5">PURCHASED CONTENT</text>
      </g>
      <circle cx="664" cy="100" r="5" fill="#c6784e" />
      <circle cx="643" cy="100" r="5" fill="#31544a" />
    </svg>
  );
}

function AttendlyArt() {
  return (
    <svg className="project-art" viewBox="0 0 720 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="720" height="360" fill="#101b24" />
      <path d="M0 0h720v62H0z" fill="#172833" />
      <text x="42" y="39" fill="#e5eee8" fontSize="13" fontWeight="700" letterSpacing="3">ATTENDLY</text>
      <text x="678" y="39" textAnchor="end" fill="#8ba5a1" fontSize="9" letterSpacing="2">ATTENDANCE / 7-DAY VIEW</text>
      <path d="M80 268h560" stroke="#34464e" strokeWidth="2" />
      <path d="M112 218v50M195 186v82M278 207v61M361 145v123M444 181v87M527 166v102M610 125v143" stroke="#29413e" strokeWidth="1" />
      <g fill="#9ad8ba">
        <rect x="94" y="228" width="36" height="40" rx="3" />
        <rect x="177" y="196" width="36" height="72" rx="3" />
        <rect x="260" y="217" width="36" height="51" rx="3" />
        <rect x="343" y="155" width="36" height="113" rx="3" />
        <rect x="426" y="191" width="36" height="77" rx="3" />
        <rect x="509" y="176" width="36" height="92" rx="3" />
        <rect x="592" y="135" width="36" height="133" rx="3" />
      </g>
      <path d="M112 204 195 167 278 189 361 124 444 160 527 144 610 104" fill="none" stroke="#f2b66d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <g fill="#101b24" stroke="#f2b66d" strokeWidth="3">
        <circle cx="112" cy="204" r="6" /><circle cx="195" cy="167" r="6" /><circle cx="278" cy="189" r="6" /><circle cx="361" cy="124" r="6" /><circle cx="444" cy="160" r="6" /><circle cx="527" cy="144" r="6" /><circle cx="610" cy="104" r="6" />
      </g>
      <g fill="#96aaa8" fontSize="9" letterSpacing="1.5" textAnchor="middle">
        <text x="112" y="292">MON</text><text x="195" y="292">TUE</text><text x="278" y="292">WED</text><text x="361" y="292">THU</text><text x="444" y="292">FRI</text><text x="527" y="292">SAT</text><text x="610" y="292">SUN</text>
      </g>
      <rect x="42" y="91" width="214" height="42" rx="21" fill="#203a3b" />
      <circle cx="66" cy="112" r="7" fill="#9ad8ba" />
      <text x="84" y="116" fill="#c4d7d0" fontSize="10" letterSpacing="1.5">PUNCH EVENTS → REVIEW</text>
      <text x="678" y="333" textAnchor="end" fill="#738c8d" fontSize="9" letterSpacing="1.5">COMPANY-SCOPED RECORDS</text>
    </svg>
  );
}

function PortfolioArt() {
  return (
    <svg className="project-art" viewBox="0 0 720 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="720" height="360" fill="#121a25" />
      <path d="M0 0h720v48H0z" fill="#1a2632" />
      <circle cx="38" cy="24" r="10" fill="none" stroke="#83b8ff" />
      <text x="38" y="28" textAnchor="middle" fill="#83b8ff" fontSize="7" fontWeight="700">PJ</text>
      <text x="58" y="28" fill="#e6edf4" fontSize="10" fontWeight="700">PRAKHAR JAIN</text>
      <text x="674" y="28" textAnchor="end" fill="#9eafbf" fontSize="8" letterSpacing="2">WORK / ABOUT / CONTACT</text>
      <path d="M0 48h720" stroke="#2b3947" />
      <text x="54" y="112" fill="#83b8ff" fontSize="9" letterSpacing="2.4">SALESFORCE · FULL-STACK</text>
      <text x="50" y="176" fill="#e8edf2" fontSize="49" fontWeight="500" letterSpacing="-2.4">Build with</text>
      <text x="50" y="228" fill="#83b8ff" fontSize="49" fontFamily="Georgia,serif" fontStyle="italic" letterSpacing="-2">purpose.</text>
      <path d="M60 263h254" stroke="#526579" />
      <path d="M60 278h173" stroke="#526579" />
      <rect x="50" y="304" width="112" height="30" rx="2" fill="#4b98ff" />
      <text x="106" y="323" textAnchor="middle" fill="#0c1824" fontSize="8" fontWeight="700" letterSpacing="1">EXPLORE PROJECTS</text>
      <rect x="383" y="75" width="290" height="251" rx="4" fill="#1b2936" stroke="#3b5163" />
      <path d="M383 75h290v32H383z" fill="#253746" />
      <circle cx="400" cy="91" r="3" fill="#83b8ff" /><circle cx="412" cy="91" r="3" fill="#6e8598" /><circle cx="424" cy="91" r="3" fill="#6e8598" />
      <circle cx="527" cy="204" r="72" fill="#182b3a" stroke="#83b8ff" strokeOpacity=".56" />
      <circle cx="527" cy="204" r="94" fill="none" stroke="#83b8ff" strokeOpacity=".2" />
      <text x="527" y="215" textAnchor="middle" fill="#e6eef7" fontFamily="Georgia,serif" fontSize="48">PJ</text>
      <text x="527" y="238" textAnchor="middle" fill="#91acd0" fontSize="7" letterSpacing="2">BUILD · LEARN · REFINE</text>
      <path d="M415 292h76M563 292h82" stroke="#526579" strokeWidth="4" strokeLinecap="round" />
      <circle cx="400" cy="292" r="7" fill="#4b98ff" />
    </svg>
  );
}

function VisionArt() {
  return (
    <svg className="project-art" viewBox="0 0 720 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="720" height="360" fill="#10201e" />
      <path d="M0 0h720v42H0z" fill="#172b28" />
      <text x="40" y="27" fill="#d8eee0" fontSize="10" fontWeight="700" letterSpacing="2.5">VISIONOS</text>
      <text x="680" y="27" textAnchor="end" fill="#92afa1" fontSize="8" letterSpacing="1.8">GESTURE / GAZE INPUT</text>
      <path d="M56 72h42M56 72v42M664 72h-42M664 72v42M56 300h42M56 300v-42M664 300h-42M664 300v-42" fill="none" stroke="#8fe1b5" strokeWidth="2" />
      <ellipse cx="370" cy="198" rx="206" ry="118" fill="#203c35" fillOpacity=".7" stroke="#487968" strokeDasharray="5 8" />
      <path d="M333 271 320 169c-3-22 24-29 31-8l13 45-7-94c-2-23 27-28 33-5l10 80 2-77c1-23 29-25 34-1l4 80 12-45c6-21 31-13 27 8l-13 66c-8 42-34 66-72 67-30 1-55-19-61-44Z" fill="#d7ebd9" fillOpacity=".18" stroke="#a5ebbd" strokeWidth="3" strokeLinejoin="round" />
      <path d="m327 167 27 4m19-21 26 3m19-3 23 4m-26 46 37 5m-85 20 64 7m-94 39 88 8" stroke="#75c99c" strokeOpacity=".75" strokeWidth="1.5" />
      <g fill="#c8ffd8" stroke="#10201e" strokeWidth="2">
        <circle cx="321" cy="168" r="6" /><circle cx="351" cy="211" r="6" /><circle cx="357" cy="112" r="6" /><circle cx="400" cy="187" r="6" /><circle cx="404" cy="107" r="6" /><circle cx="454" cy="188" r="6" /><circle cx="481" cy="146" r="6" />
      </g>
      <path d="M322 168 351 211 357 112 400 187 404 107 454 188 481 146" fill="none" stroke="#c8ffd8" strokeOpacity=".6" strokeWidth="1.5" />
      <circle cx="554" cy="112" r="25" fill="#c8ffd8" fillOpacity=".12" stroke="#a5ebbd" />
      <circle cx="554" cy="112" r="4" fill="#c8ffd8" />
      <path d="M554 84v14m0 28v14m-28-28h14m28 0h14" stroke="#a5ebbd" strokeOpacity=".7" />
      <text x="75" y="330" fill="#91b5a4" fontSize="8" letterSpacing="1.8">LANDMARKS → POINTER CONTROL</text>
      <text x="645" y="330" textAnchor="end" fill="#91b5a4" fontSize="8" letterSpacing="1.8">REAL-TIME TRACKING</text>
    </svg>
  );
}

function HospitalArt() {
  return (
    <svg className="project-art" viewBox="0 0 720 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="720" height="360" fill="#e8e8dd" />
      <path d="M0 0h720v53H0z" fill="#d8ded1" />
      <text x="40" y="34" fill="#233d3a" fontSize="10" fontWeight="700" letterSpacing="2.3">HOSPITAL MANAGEMENT SYSTEM</text>
      <text x="680" y="34" textAnchor="end" fill="#65786e" fontSize="8" letterSpacing="1.5">RELATIONAL MODEL</text>
      <path d="M198 136H300M420 136h102M360 166v58M198 246h102M420 246h102" fill="none" stroke="#648079" strokeWidth="2" />
      <path d="M300 136h120m-60 0v110" fill="none" stroke="#648079" strokeWidth="2" strokeDasharray="4 5" />
      <g>
        <rect x="45" y="84" width="153" height="105" rx="4" fill="#f5f3e8" stroke="#a3b1a3" />
        <rect x="45" y="84" width="153" height="27" rx="4" fill="#315a52" />
        <text x="59" y="102" fill="#edf0e6" fontSize="9" fontWeight="700" letterSpacing="1.5">PATIENT</text>
        <circle cx="76" cy="144" r="13" fill="#d6a77f" />
        <path d="M56 177c3-18 37-18 40 0" fill="#b8c9bb" />
        <path d="M111 135h68m-68 12h55m-55 12h62" stroke="#9fae9f" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g>
        <rect x="300" y="86" width="120" height="80" rx="4" fill="#f5f3e8" stroke="#a3b1a3" />
        <rect x="300" y="86" width="120" height="24" rx="4" fill="#bd714e" />
        <text x="314" y="102" fill="#fff0df" fontSize="8" fontWeight="700" letterSpacing="1.2">APPOINTMENT</text>
        <path d="M316 128h88m-88 12h60" stroke="#9fae9f" strokeWidth="3" strokeLinecap="round" />
        <circle cx="395" cy="142" r="7" fill="#6b9989" />
      </g>
      <g>
        <rect x="522" y="84" width="153" height="105" rx="4" fill="#f5f3e8" stroke="#a3b1a3" />
        <rect x="522" y="84" width="153" height="27" rx="4" fill="#315a52" />
        <text x="536" y="102" fill="#edf0e6" fontSize="9" fontWeight="700" letterSpacing="1.5">DOCTOR</text>
        <circle cx="553" cy="144" r="13" fill="#9b786c" />
        <path d="M533 177c3-18 37-18 40 0" fill="#a9c2b3" />
        <path d="M588 135h68m-68 12h55m-55 12h62" stroke="#9fae9f" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g>
        <rect x="300" y="224" width="120" height="78" rx="4" fill="#dce6dc" stroke="#8aa093" />
        <path d="M350 239h20v14h14v20h-14v14h-20v-14h-14v-20h14z" fill="#bd714e" />
      </g>
      <g>
        <rect x="522" y="224" width="153" height="78" rx="4" fill="#f5f3e8" stroke="#a3b1a3" />
        <text x="538" y="246" fill="#315a52" fontSize="8" fontWeight="700" letterSpacing="1.4">DOCTOR SCHEDULE</text>
        <path d="M540 263h115M540 275h78M540 287h99" stroke="#a2b1a3" strokeWidth="3" strokeLinecap="round" />
      </g>
      <text x="45" y="324" fill="#6b7e73" fontSize="8" letterSpacing="1.5">PATIENTS · APPOINTMENTS · SCHEDULES</text>
    </svg>
  );
}

function ForecastArt() {
  return (
    <svg className="project-art" viewBox="0 0 720 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="720" height="360" fill="#eee2c7" />
      <path d="M0 0h720v59H0z" fill="#dfd0ae" />
      <text x="40" y="37" fill="#303d43" fontSize="10" fontWeight="700" letterSpacing="2.5">STORE SALES FORECASTING</text>
      <text x="680" y="37" textAnchor="end" fill="#7c6f55" fontSize="8" letterSpacing="1.5">TREND / SEASONALITY</text>
      <path d="M92 292V98M92 292h554" stroke="#788078" strokeWidth="1.5" />
      <g stroke="#a8a38e" strokeOpacity=".58" strokeDasharray="3 7">
        <path d="M92 242h554M92 192h554M92 142h554M202 98v194M312 98v194M422 98v194M532 98v194" />
      </g>
      <g fill="#bd714e">
        <rect x="120" y="229" width="25" height="63" rx="3" /><rect x="165" y="205" width="25" height="87" rx="3" />
        <rect x="230" y="197" width="25" height="95" rx="3" /><rect x="275" y="159" width="25" height="133" rx="3" />
        <rect x="340" y="179" width="25" height="113" rx="3" /><rect x="385" y="143" width="25" height="149" rx="3" />
        <rect x="450" y="127" width="25" height="165" rx="3" /><rect x="495" y="143" width="25" height="149" rx="3" />
        <rect x="560" y="101" width="25" height="191" rx="3" /><rect x="605" y="119" width="25" height="173" rx="3" />
      </g>
      <path d="M109 214c42 8 43-29 82-18s38 28 75 1 43-32 80-18 39 6 78-29 46 7 82-10 41-38 79-28" fill="none" stroke="#315b58" strokeWidth="4" strokeLinecap="round" />
      <g fill="#f4e8cd" stroke="#315b58" strokeWidth="3">
        <circle cx="109" cy="214" r="5" /><circle cx="191" cy="196" r="5" /><circle cx="266" cy="197" r="5" /><circle cx="346" cy="179" r="5" /><circle cx="424" cy="150" r="5" /><circle cx="506" cy="140" r="5" /><circle cx="585" cy="112" r="5" /><circle cx="664" cy="103" r="5" />
      </g>
      <rect x="488" y="73" width="151" height="28" rx="14" fill="#315b58" />
      <text x="564" y="91" textAnchor="middle" fill="#e9e5d7" fontSize="8" letterSpacing="1.5">ACF / PACF · SMA / EMA</text>
    </svg>
  );
}

function CellCountingArt() {
  return (
    <svg className="project-art" viewBox="0 0 720 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="720" height="360" fill="#221c31" />
      <path d="M0 0h720v52H0z" fill="#30253d" />
      <text x="40" y="32" fill="#eee4f4" fontSize="10" fontWeight="700" letterSpacing="2.2">CANCER CELL IMAGE COUNTING</text>
      <text x="680" y="32" textAnchor="end" fill="#b5a4c3" fontSize="8" letterSpacing="1.5">RESNET-34 / REGRESSION</text>
      <rect x="36" y="70" width="648" height="250" rx="3" fill="#2d253a" stroke="#6e587f" />
      <path d="M36 132h648M36 194h648M36 256h648M165 70v250M294 70v250M423 70v250M552 70v250" stroke="#a88ab7" strokeOpacity=".11" />
      <path d="M36 70h648v250H36z" fill="url(#cellWash)" />
      <defs>
        <radialGradient id="cellWash"><stop stopColor="#835e91" stopOpacity=".44" /><stop offset="1" stopColor="#35283e" stopOpacity="0" /></radialGradient>
      </defs>
      <g fill="#9d729f" fillOpacity=".56" stroke="#d5a6ca" strokeOpacity=".82" strokeWidth="2">
        <path d="M117 113c17-17 42-9 49 8 8 19-6 37-25 39-20 2-39-11-36-28 1-8 5-14 12-19Z" />
        <path d="M221 102c14-10 34-3 39 11 6 16-2 32-18 36-18 4-34-8-31-25 1-9 4-16 10-22Z" />
        <path d="M365 106c21-7 37 6 37 23 0 18-13 30-30 28-17-1-29-14-25-29 2-10 8-17 18-22Z" />
        <path d="M506 111c15-14 37-8 45 8 8 16-1 35-18 39-19 5-37-7-36-25 0-9 3-16 9-22Z" />
        <path d="M606 92c13-8 30-2 34 12 5 15-5 28-19 30-16 2-28-9-25-23 1-8 4-14 10-19Z" />
        <path d="M157 222c18-12 36-4 41 12 6 17-5 32-22 34-18 2-33-9-31-25 1-9 5-16 12-21Z" />
        <path d="M296 223c14-14 35-11 43 4 9 16 0 35-17 40-18 5-35-6-34-23 0-8 2-15 8-21Z" />
        <path d="M443 214c16-10 35-4 40 12 5 16-5 31-22 33-18 2-32-9-30-25 1-8 5-15 12-20Z" />
        <path d="M570 225c15-12 35-7 41 9 6 17-5 33-22 35-19 2-33-11-29-28 1-6 4-12 10-16Z" />
      </g>
      <g fill="#382944" stroke="#e3b9d7" strokeWidth="1.5">
        <ellipse cx="142" cy="136" rx="9" ry="7" /><ellipse cx="238" cy="125" rx="8" ry="10" /><ellipse cx="379" cy="132" rx="10" ry="8" /><ellipse cx="526" cy="135" rx="9" ry="11" /><ellipse cx="621" cy="114" rx="7" ry="8" />
        <ellipse cx="176" cy="245" rx="10" ry="8" /><ellipse cx="320" cy="245" rx="8" ry="11" /><ellipse cx="462" cy="237" rx="9" ry="8" /><ellipse cx="589" cy="244" rx="10" ry="7" />
      </g>
      <path d="M76 87h22M76 87v22M644 87h-22M644 87v22M76 302h22M76 302v-22M644 302h-22M644 302v-22" stroke="#edc9e0" strokeWidth="2" />
      <text x="58" y="342" fill="#b8a3c6" fontSize="8" letterSpacing="1.5">NORMALIZED IMAGE → PREDICTED CELL COUNT</text>
    </svg>
  );
}

function ProjectIllustration({ kind }: { kind: Project["visual"] }) {
  switch (kind) {
    case "study": return <StudyArt />;
    case "attendly": return <AttendlyArt />;
    case "portfolio": return <PortfolioArt />;
    case "vision": return <VisionArt />;
    case "hospital": return <HospitalArt />;
    case "forecast": return <ForecastArt />;
    case "microscopy": return <CellCountingArt />;
  }
}

export function ProjectVisual({ kind, title }: { kind: Project["visual"]; title: string }) {
  return (
    <div className="project-visual" role="img" aria-label={`${title} project artwork`}>
      <ProjectIllustration kind={kind} />
    </div>
  );
}
