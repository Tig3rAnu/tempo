import Link from 'next/link';

function UserNotifications() {
  return (
    <ul className="flex h-auto flex-col overflow-y-auto">
      <li>
        <Link
          className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
          href="#"
        >
          <p className="text-sm">
            <span className="text-black dark:text-white">
              Edit your information in a swipe
            </span>{' '}
            Sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim.
          </p>

          <p className="text-xs">12 May, 2025</p>
        </Link>
      </li>
      <li>
        <Link
          className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
          href="#"
        >
          <p className="text-sm">
            <span className="text-black dark:text-white">
              It is a long established fact
            </span>{' '}
            that a reader will be distracted by the readable.
          </p>

          <p className="text-xs">24 Feb, 2025</p>
        </Link>
      </li>
      <li>
        <Link
          className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
          href="#"
        >
          <p className="text-sm">
            <span className="text-black dark:text-white">
              There are many variations
            </span>{' '}
            of passages of Lorem Ipsum available, but the majority have suffered
          </p>

          <p className="text-xs">04 Jan, 2025</p>
        </Link>
      </li>
      <li>
        <Link
          className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
          href="#"
        >
          <p className="text-sm">
            <span className="text-black dark:text-white">
              There are many variations
            </span>{' '}
            of passages of Lorem Ipsum available, but the majority have suffered
          </p>

          <p className="text-xs">01 Dec, 2024</p>
        </Link>
      </li>
    </ul>
  );
}
export default UserNotifications;
