import {
  Flex,
  VStack,
  Heading,
  Text,
  Box,
  HStack,
  Link,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import {
  InstagramFilled,
  FacebookFilled,
  YoutubeFilled,
  WhatsAppOutlined,
  PhoneOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import CheckCouponForm from "../components/CheckCouponForm";
import RegisterForm from "../components/RegisterForm";
import { api } from "../api";

const MotionBox = motion(Box);

export default function Home() {
  const [validCode, setValidCode] = useState<string | null>(null);
  const [stats, setStats] = useState<{ totalCoupons: number; usedCoupons: number; participants: number } | null>(null);
  const controls = useAnimation();

  const bg = "linear-gradient(135deg, #0077b6, #00b4d8, #90e0ef)";
  const statBg = useColorModeValue("rgba(255,255,255,0.25)", "rgba(255,255,255,0.15)");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/api/stats/summary");
        setStats(data);
        controls.start("visible");
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    })();
  }, []);

  return (
    <Box bgGradient={bg} minH="100vh" py={8} px={4} color="white">
      <VStack spacing={10} align="center" justify="center" w="100%" maxW="1200px" mx="auto">
        {/* ✅ الشروط */}
        <VStack
          align="center"
          spacing={3}
          bg="rgba(255,255,255,0.1)"
          p={6}
          rounded="2xl"
          shadow="md"
          w="100%"
          maxW={{ base: "95%", md: "600px" }}
          textAlign="center"
        >
          <Heading size="lg" color="yellow.200">
            🎯 خطوات الاشتراك والفوز
          </Heading>
          <Text fontSize="md" opacity={0.9}>
            لكي تكون مؤهلًا للفوز، اتبع الخطوات التالية بعناية:
          </Text>
          <VStack spacing={2} fontSize="md">
            <Text>✅ الاشتراك بـ 5 دنانير فقط عن طريق شراء الكوبون</Text>
            <Text>✅ متابعة صفحاتنا على وسائل التواصل الاجتماعي</Text>
            <Text>✅ كل رمز يمنحك فرصة جديدة للفوز</Text>
            <Text>🚗 السيارة الجديدة بانتظارك!</Text>
          </VStack>
          <HStack spacing={6} fontSize="2xl" mt={3}>
            <Link href="https://www.instagram.com/x.m.a.m.d/" target="_blank" _hover={{ color: "pink.300" }}>
              <InstagramFilled />
            </Link>
            <Link href="https://web.facebook.com/mostafa.ali.securit.2002" target="_blank" _hover={{ color: "blue.300" }}>
              <FacebookFilled />
            </Link>
            <Link href="https://www.youtube.com/@MostafaDragmeh" target="_blank" _hover={{ color: "red.400" }}>
              <YoutubeFilled />
            </Link>
            <Link href="https://wa.me/962789461710" target="_blank" _hover={{ color: "green.400" }}>
              <WhatsAppOutlined />
            </Link>
          </HStack>
        </VStack>

        {/* ✅ مربع التحقق / التسجيل */}
        <MotionBox
          bg="whiteAlpha.900"
          color="#003a52"
          w="100%"
          maxW={{ base: "95%", md: "450px" }}
          borderRadius="2xl"
          boxShadow="2xl"
          p={6}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <Heading size="md" textAlign="center" mb={4}>
            {!validCode ? "🔐 تحقق من الرمز" : "🧾 أكمل بياناتك"}
          </Heading>

          {/* ✅ الإحصائيات */}
          {!validCode && stats && (
            <MotionBox
              initial={{ opacity: 0, y: -10 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              bg={statBg}
              borderRadius="lg"
              backdropFilter="blur(10px)"
              p={3}
              mb={5}
              boxShadow="md"
            >
              <HStack justify="space-around" spacing={2}>
                <Stat textAlign="center">
                  <StatLabel fontSize="sm" color="gray.700">
                    الإجمالي
                  </StatLabel>
                  <StatNumber fontSize="lg" fontWeight="bold" color="blue.600">
                    {stats.totalCoupons ?? 0}
                  </StatNumber>
                </Stat>
                <Stat textAlign="center">
                  <StatLabel fontSize="sm" color="gray.700">
                    المستخدم
                  </StatLabel>
                  <StatNumber fontSize="lg" fontWeight="bold" color="red.500">
                    {stats.usedCoupons ?? 0}
                  </StatNumber>
                </Stat>
                <Stat textAlign="center">
                  <StatLabel fontSize="sm" color="gray.700">
                    المشاركين
                  </StatLabel>
                  <StatNumber fontSize="lg" fontWeight="bold" color="green.500">
                    {stats.participants ?? 0}
                  </StatNumber>
                </Stat>
              </HStack>
            </MotionBox>
          )}

          {!validCode ? (
            <CheckCouponForm onValid={setValidCode} />
          ) : (
            <RegisterForm couponCode={validCode} />
          )}
        </MotionBox>

        {/* ✅ شراء الكوبون */}
        <VStack
          align="center"
          spacing={4}
          bg="rgba(255,255,255,0.1)"
          borderRadius="2xl"
          p={6}
          w="100%"
          maxW={{ base: "95%", md: "500px" }}
          textAlign="center"
          shadow="md"
        >
          <Heading size="lg" color="white">
            💳 شراء الكوبون
          </Heading>
          <Text fontSize="md" opacity={0.9}>
            يمكنك شراء كوبون الاشتراك بسهولة عبر التواصل معنا مباشرة على الرقم التالي:
          </Text>

          <HStack
            as={Link}
            href="https://wa.me/962789461710"
            target="_blank"
            bg="whiteAlpha.900"
            color="#003a52"
            p={3}
            borderRadius="lg"
            spacing={3}
            w="100%"
            justify="center"
            _hover={{ transform: "scale(1.03)", boxShadow: "lg" }}
            transition="all 0.2s ease"
          >
            <Icon as={WhatsAppOutlined} color="green.500" boxSize={6} />
            <Text fontWeight="bold" fontSize="lg" dir="ltr">
              +962 78 946 1710
            </Text>
          </HStack>

          <Text fontSize="md" mt={2}>
            أو تواصل معنا عبر صفحاتنا على وسائل التواصل الاجتماعي للاستفسار عن طرق الدفع 💬
          </Text>

          <HStack fontSize="2xl" gap={5} justify="center" mt={2}>
            <Link href="tel:+962789461710" _hover={{ color: "yellow.300" }}>
              <Icon as={PhoneOutlined} />
            </Link>
            <Link href="#" _hover={{ color: "teal.200" }}>
              <Icon as={DollarOutlined} />
            </Link>
            <Link href="https://wa.me/962789461710" target="_blank" _hover={{ color: "green.400" }}>
              <Icon as={WhatsAppOutlined} />
            </Link>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}
